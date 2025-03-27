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
              ref="constructorRef"
              :draft="currentDraftData"
              :configuration="configurationData"
              @on-start-click="console.log('start')"
            />
            <ChatWindow/>
          </div>
        </template>
        <div class="workspace-view__second" v-if="currentStep === 2">
          <Tools  @on-back-click="goToPrevStep"  @on-start-click="showModal"/>
          <ModelViewer/>
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
import Constructor, { type ICreatePayload } from '@/components/workspace/Constructor.vue';
import ChatWindow from '@/components/workspace/chat/ChatWindow.vue';
import Tools from '@/components/workspace/Tools.vue';
import ModelViewer from '@/components/workspace/ModelViewer.vue';
import { ref, onMounted } from 'vue';
import { Modal, notification } from 'ant-design-vue';
import AimButton from '@/ui/buttons/AimButton.vue';
import http from '@/services/http';
import type { IConfiguration, IDraft } from '@/types/configurations';

const currentStep = ref(1)

const goToNextStep = async () => {
  // await createConfiguration(true)
  currentStep.value = 2
}

const goToPrevStep = () => {
  currentStep.value = 1
}

const open = ref<boolean>(false);
const draftList = ref<IDraft[]>([]);
const currentDraftData = ref<IDraft>();
const currentDraftIndex = ref<number | null>(null)

const constructorRef = ref(null)

const configurationData = ref<IConfiguration[]>()

const showModal = () => {
  open.value = true;
};

const onModalAccept = () => {
  open.value = false;
};

const onModalCancel = () => {
  open.value = false;
};

const loadConfigurations = () => {
  http.get<IConfiguration[]>('configurations/types-with-controls/').then((res) => {
    console.log('loadConfigurations', res )
    configurationData.value = res.data
  })
}
const loadControls = (machineType: string) => {
  http.get<IDraft[]>('configurations/control_systems/', { params: { machine_type: machineType } }).then((res) => {
    console.log('loadControls', res )
  })
}

const createConfiguration = async (isDraft: boolean) => {
  const config = constructorRef.value as unknown as ICreatePayload
  const payload = {
    machine_type: config?.machine_type?.type,
    control_system: config?.control_system?.type,
    x_size: config?.x_size,
    y_size: config?.y_size,
    z_size: config?.z_size,
    diameter: config?.diameter,
    is_draft: isDraft,
    stl_file: config?.stl_file,
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
  createConfiguration(true).then((res) => {
    draftList.value.push(res.data)
    notification.success({
      message: 'Черновик успешно сохранен',
    })
  }).catch((err) => {
    const errObj = err.response.data
    Object.keys(errObj).forEach(key => {
      notification.error({
        message: `${key}: ${errObj[key]}`,
      })
    });
  })

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

const onCreateConfiguration = async () => {
  createConfiguration(false).then(() => {
    goToNextStep()
  })
}

onMounted(() => {
  loadConfigurations()
  loadDrafts()
  loadControls('milling')
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

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
    }
  }

  &__button {
    max-width: 450px;
  }
}
</style>
