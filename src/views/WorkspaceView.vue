<template>
  <div class="workspace-view">
    <div class="workspace-view__content">
      <div class="workspace-view__grid">
        <template v-if="currentStep === 1">
          <Actions
            :configuration-counter="draftList.length"
            @clear-all-configurations="clearAllConfigurations"
            @change-configuration="changeDraft"
            @save-configuration="saveConfiguration"
          />
          <div class="workspace-view__first">
            <Constructor
              :loading="configurationDataLoading"
              ref="constructorRef"
              :draft="currentDraftData"
              :configuration="configurationData"
              :materials="materials"
              @on-start-click="showModal"
            />
            <ChatWindow/>
          </div>
        </template>
        <div class="workspace-view__second" v-if="currentStep === 2">
          <Tools :loading="toolsLoading" :tools="tools"  @on-back-click="currentStep--"/>
          <div class="workspace-view__second-items">
            <ModelViewer :gCodeData="gCodeData" :stl-url="constructorStore.uploadedStlFileUrl"/>
            <GCode :data="gCodeData"/>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model:open="open" title="Предупреждение!">
      <p>Дальнейшие действия вы выполняете под свою ответственность! Неправильно указанные данные или отсутствие в указанных позициях рекомендуемого инструмента
        может повлечь за собой снижение качества исполнения детали и времени её изготовления, а также
        к  неисправности станка или поломке инструмента.
      </p>
       <template #footer>
        <AimButton :is-full-width="false" color="cyan" @click="onModalCancel">Назад</AimButton>
        <AimButton :is-full-width="false" color="orange" @click="onModalAccept">Принять</AimButton>
       </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import Actions from '@/components/workspace/Actions.vue';
import Constructor from '@/components/workspace/Constructor.vue';
import ChatWindow from '@/components/workspace/chat/ChatWindow.vue';
import Tools from '@/components/workspace/Tools.vue';
import ModelViewer from '@/components/workspace/ModelViewer.vue';
import { ref, onMounted } from 'vue';
import { Modal, notification } from 'ant-design-vue';
import AimButton from '@/ui/buttons/AimButton.vue';
import http from '@/services/http';
import type { IConfiguration, IDraft, IGcode, IMaterial, ITool } from '@/types/configurations';
import { useConstructorStore } from '@/stores/constructor';
import GCode from '@/components/workspace/GCode.vue';
const constructorStore = useConstructorStore()
const currentStep = ref(1)
const tools = ref<ITool[]>([])
const toolsLoading = ref(false)

const open = ref<boolean>(false);
const draftList = ref<IDraft[]>([]);
const currentDraftData = ref<IDraft>();
const currentDraftIndex = ref<number | null>(null)

const constructorRef = ref(null)

const configurationData = ref<IConfiguration[]>()
const configurationDataLoading = ref(false)

const materials = ref<IMaterial[]>([])

const gCodeData = ref<IGcode>({
  gcode: '',
  saved: false,
  message: '',
  readyTime: 0
})

const showModal = () => {
  open.value = true;
};

const onModalAccept = () => {
  open.value = false;
  onCreateConfiguration()
}

const onModalCancel = () => {
  open.value = false;
};

const loadConfigurations = () => {
  configurationDataLoading.value = true
  http.get<IConfiguration[]>('configurations/types-with-controls/').then((res) => {
    configurationData.value = res.data
  }).finally(() => {
    configurationDataLoading.value = false
  })
}
const loadTools = (machineTypeId: number) => {
  toolsLoading.value = true
  http.get<ITool[]>('configurations/tools/', { params: { machine_type_id: machineTypeId } }).then((res) => {
    tools.value = res.data
  }).finally(() => {
    toolsLoading.value = false
  })
}
const loadMaterials = () => {
  http.get<ITool[]>('materials/').then((res) => {
    materials.value = res.data
  }).finally(() => {
  })
}

const createDraft = async () => {
  const payload = {
    machine_type: constructorStore.machineType!.id,
    control_system: constructorStore.standType!.id,
    x_size: constructorStore.xSize,
    y_size: constructorStore.ySize,
    z_size: constructorStore.zSize,
    diameter: constructorStore.diameter,
    stl_file_url: constructorStore.uploadedStlFileUrl,
    material: constructorStore.material!.id,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return http.postFormData<any>('configurations/', payload)
}
const loadDrafts = () => {
  http.get<IDraft[]>('configurations/drafts/').then((res) => {
    draftList.value = res.data
  })
}

const saveConfiguration = async () => {
  createDraft().then((res) => {
    draftList.value.push(res.data)
    notification.success({
      message: 'Черновик успешно сохранен!',
    })
  }).catch((err) => {
    if (err.status === 400) {
      const errObj = err.response.data
      if (errObj['non_field_errors']) {
        notification.error({
          message: `${errObj['non_field_errors']}`,
        })
      } else {
        Object.keys(errObj).forEach(key => {
        notification.error({
          message: `${key}: ${errObj[key]}`,
        })
      });
      }
    } else {
      notification.error({
        message: `Что-то пошло не так...`,
      })
    }}
  )
}
const changeDraft = () => {
  const tmpIndex = currentDraftIndex.value === null ? -1 : currentDraftIndex.value
  const isNextExist = tmpIndex <= draftList.value.length - 2
  const newIndex = isNextExist ? tmpIndex + 1 : 0
  currentDraftIndex.value = newIndex
  currentDraftData.value = draftList.value[newIndex]

}
const clearAllConfigurations = () => {
  http.delete('configurations/clear_drafts/').then(() => {
    draftList.value = []

    notification.success({
      message: 'Черновики успешно очищены',
    })
  })
}


const createGCode = async () => {
  const payload = {
    machine_type: constructorStore.machineType!.id,
    control_system: constructorStore.standType!.id,
    x_size: constructorStore.xSize,
    y_size: constructorStore.ySize,
    z_size: constructorStore.zSize,
    diameter: constructorStore.diameter,
    stl_file_url: constructorStore.uploadedStlFileUrl,
    material: constructorStore.material!.id,
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return http.postFormData<any>('configurations/calculate_gcode/', payload).then((res) => {
    gCodeData.value = res.data
  })
}

const onCreateConfiguration = async () => {
  loadTools(constructorStore.machineType!.id)
  createGCode().then((e) => {
    currentStep.value = 2
    constructorStore.resetStore()
  }).catch((e) => {
  })
}

onMounted(() => {
  loadConfigurations()
  loadDrafts()
  loadMaterials()
})

</script>

<style lang="scss">
.workspace-view {
  position: relative;
  background-color: var(--color-black);
  background-image: url('../assets/robot.png');
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(58, 57, 57, 0.5);
    pointer-events: none;
    z-index: 0;
  }

  &__content {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
  }

  &__grid {
    margin: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__first {
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr minmax(420px, 1fr);

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
    }
  }

  &__second {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;

    &-items {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
    }
  }

  &__button {
    max-width: 450px;
  }
}
</style>
