<template>
  <div class="workspace-view">
    <div class="workspace-view__content">
      <div class="workspace-view__grid">
        <template v-if="currentStep === 1">
          <Actions
            :configuration-counter="configurationList.length"
            @clear-all-configurations="clearAllConfigurations"
            @change-configuration="changeConfiguration"
            @save-configuration="saveConfiguration"
          />
          <div class="workspace-view__first">
            <Constructor @on-start-click="goToNextStep"/>
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
import Constructor from '@/components/workspace/Constructor.vue';
import ChatWindow from '@/components/workspace/chat/ChatWindow.vue';
import Tools from '@/components/workspace/Tools.vue';
import ModelViewer from '@/components/workspace/ModelViewer.vue';
import { ref, onMounted } from 'vue';
import { Modal, notification } from 'ant-design-vue';
import AimButton from '@/ui/buttons/AimButton.vue';
import http from '@/services/http';
import type { IConfiguration } from '@/types/configurations';

const currentStep = ref(1)

const goToNextStep = () => {
  currentStep.value = 2
}

const goToPrevStep = () => {
  currentStep.value = 1
}

const open = ref<boolean>(false);
const configurationList = ref<IConfiguration[]>([]);
const currentConfigurationData = ref<IConfiguration | object>({});
const currentConfigurationIndex = ref<number>(0)

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
  http.get<IConfiguration[]>('configurations/').then((res) => {
    configurationList.value = res.data
  })
}

const saveConfiguration = () => {
  // http.get('configurations/').then((res) => {
  //   configurationList.value = res.data
  // })

  notification.success({
    message: 'Черновик успешно сохранен',
  })
}
const changeConfiguration = () => {
  const newIndex = currentConfigurationIndex.value + 1
  currentConfigurationIndex.value = newIndex
  currentConfigurationData.value = configurationList.value[newIndex]

}
const clearAllConfigurations = () => {
  http.delete('configurations/clear_all/').then(() => {
    configurationList.value = []

    notification.success({
      message: 'Черновики успешно очищены',
    })
  })
}

onMounted(() => {
  loadConfigurations()
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
