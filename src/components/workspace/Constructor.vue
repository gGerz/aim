<template>
  <Card class="constructor">
    <template #title>
      Конфигурация
      <Tooltip title="Здравствуйте, я нейросеть AIM v1.0. Я могу помочь вам в оптимизации вашей работы на ЧПУ-станке. Введите, пожалуйста, ваши исходные данные и прикрепите STL-модель, чтобы мне было легче определить, какими инструментами вам стоит воспользоваться для выполнения задачи!">
        <QuestionCircleOutlined />
      </Tooltip>
    </template>
    <div class="constructor__inputs">
      <div class="constructor__row">
        <div class="constructor__label">
          <span>Выберите тип станка</span>
          <RadioGroup v-model:value="constructorStore.machineType">
            <RadioButton v-for="machine in configuration" :key="machine.id" :value="machine">{{machine.name}}</RadioButton>
          </RadioGroup>
        </div>
      </div>
      <div class="constructor__row">
        <div  class="constructor__label">
          <span>Выберите тип стойки</span>
          <RadioGroup v-model:value="constructorStore.standType">
            <RadioButton v-for="control in constructorStore.machineType?.controls" :key="control.id" :value="control">{{control.name}}</RadioButton>
          </RadioGroup>
        </div>
      </div>
      <div class="constructor__row">
        <div class="constructor__label">
          <span>Размеры по диаметру</span>
          <div>
            <Switch v-model:checked="constructorStore.isDiameterEnabled"/>
          </div>
        </div>
      </div>
      <div class="constructor__row">
        <label class="constructor__sizes">
          <span>Введите размер заготовки</span>
          <div class="constructor__size-inputs">
            <InputNumber v-model:value="constructorStore.xSize" :disabled="constructorStore.isDiameterEnabled">
            <template #addonBefore>
              x
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          <InputNumber v-model:value="constructorStore.ySize" :disabled="constructorStore.isDiameterEnabled">
            <template #addonBefore>
              y
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          <InputNumber v-model:value="constructorStore.zSize">
            <template #addonBefore>
              z
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          </div>
        </label>
      </div>
      <div class="constructor__row">
        <label class="constructor__sizes">
          <span>Введите диаметр</span>
          <div class="constructor__size-inputs">
            <InputNumber  v-model:value="constructorStore.diameter" :disabled="!constructorStore.isDiameterEnabled">
            <template #addonBefore>
              Ø
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          </div>
        </label>
      </div>
    </div>
    <div class="constructor__file">
      <UploadDragger :maxCount="1" :showUploadList="false" accept=".stl" :customRequest="uploadSTL">
        {{fileUploadText}}
      </UploadDragger>
    </div>
    <AimButton class="constructor__button" size="big" @click="onStartClick" :disabled="isDisabled">Старт</AimButton>
  </Card>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';
import { Card, UploadDragger, InputNumber, RadioButton, RadioGroup, notification, Switch } from 'ant-design-vue';
import { computed, onMounted, watch } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import type { IConfiguration, IControl, IDraft } from '@/types/configurations';
import http from '@/services/http';
import { useConstructorStore } from '@/stores/constructor';

export type ICreatePayload = {
  machine_type?: IConfiguration,
  control_system?: IControl,
  x_size?: number,
  y_size?: number,
  z_size?: number,
  diameter?: number,
  stl_file?: string,
}

type Emits = {
  'on-start-click': [payload: ICreatePayload]
}
type Props = {
  draft?: IDraft
  configuration?: IConfiguration[]
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()

const constructorStore = useConstructorStore()

const onStartClick = () => {
  const payload = {
    machine_type: constructorStore.machineType,
    control_system: constructorStore.standType,
    x_size: constructorStore.xSize,
    y_size: constructorStore.ySize,
    z_size: constructorStore.zSize,
    diameter: constructorStore.diameter,
    stl_file: '',
  }
  emit('on-start-click', payload)
}

const uploadSTL = (options) => {
  const { file, onSuccess, onError } = options;
  constructorStore.isFileUploaded = true
  constructorStore.isUploadErrorExist = false

  http.postFormData('upload-stl/', { file }).then((res) => {
    constructorStore.uploadedStlFileUrl = res.data.file_url
    onSuccess()
  }).catch(() => {
    onError()
    constructorStore.isUploadErrorExist = true
    notification.error({
      message: 'При загрузке файла произошла ошибка',
    })
  }).finally(() => {
    constructorStore.isFileUploaded = false
  })
}

const getStlFilename = (path: string): string | null => {
    const match = path.match(/\/([^\/]+\.stl)$/i);
    if (!match) return null;

    let filename = match[1];

    if (filename.length > 20) {
        filename = filename.slice(0, 2) + "..." + filename.slice(-15);
    }

    return filename;
}

const fileUploadText = computed(() => {
  if (constructorStore.isFileUploaded) {
    return 'Идет загрузка...'
  } else if (constructorStore.isUploadErrorExist) {
    return 'Произошла ошибка при загрузке файла'
  } else if (constructorStore.uploadedStlFileUrl) {
     return `STL-Модель "${getStlFilename(constructorStore.uploadedStlFileUrl)}" успешно добавлена!`
  } else {
    return 'Прикрепите STL-Модель'
  }
})

watch(() => props.configuration, (newVal) => {
  constructorStore.machineType = newVal?.[0]
  constructorStore.standType = newVal?.[0].controls?.[0]
})

watch(() => constructorStore.machineType, (newVal) => {
  const findStand = newVal?.controls.find((control) => control.type === constructorStore.standType?.type)
  if (!!findStand) {
    constructorStore.standType = findStand
  } else {
    constructorStore.standType = newVal?.controls?.[0]
  }
})

watch(() => props.draft, (newVal) => {
  constructorStore.machineType = props.configuration?.find((conf) => conf.id === newVal?.machine_type)

  const standIndex = props.configuration?.findIndex((conf) => conf.id === newVal?.machine_type) || 0

  constructorStore.standType = props.configuration?.[standIndex].controls.find((control) => control.id === newVal?.control_system)

  constructorStore.isDiameterEnabled = !!newVal?.diameter

  constructorStore.xSize = newVal?.x_size
  constructorStore.ySize = newVal?.y_size
  constructorStore.zSize = newVal?.z_size
  constructorStore.diameter = newVal?.diameter

  constructorStore.uploadedStlFileUrl = newVal!.stl_file

  if (newVal?.diameter) {
    constructorStore.xSize = undefined
    constructorStore.ySize = undefined
  } else {
    constructorStore.diameter = undefined
  }
})

watch(() => constructorStore.isDiameterEnabled, (newVal) => {
  if (newVal) {
    constructorStore.xSize = undefined
    constructorStore.ySize = undefined
  } else {
    constructorStore.diameter = undefined
  }
})

const isDisabled = computed(() =>  {
  if (constructorStore.isDiameterEnabled) {
    return !constructorStore.diameter || !constructorStore.zSize || !constructorStore.uploadedStlFileUrl
  } else {
    return !constructorStore.xSize || !constructorStore.ySize || !constructorStore.zSize || !constructorStore.uploadedStlFileUrl
  }
})

</script>
<style lang="scss" scoped>
 .constructor {
  background-color: var(--color-cyan);
  color: var(--color-white);
  border-color: transparent;
  border-radius: 20px;

  ::v-deep(.ant-card-head) {
    color: var(--color-white);
    border-color: var(--color-orange);
  }
  ::v-deep(.ant-card-body) {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &:after {
      display: none;
    }
    &:before {
      display: none;
    }
  }

  &__label {
    display: flex;
    flex-direction: column;
    margin: 0 0 8px 0;
  }

  &__row {
    display: flex;
    flex-direction: column;


    .ant-radio-button-wrapper {
      border-color: var(--color-orange);
    }
    .ant-radio-button-wrapper-checked {
      background: var(--color-orange);
      color: rgba(51, 51, 51, 0.88);
    }
  }

  &__size-inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;

    ::v-deep(.ant-input-number-group-addon) {
      background-color: var(--color-orange);
    }

    ::v-deep(.ant-input-number-disabled) {
      background-color: var(--color-grey);
    }
  }

  &__file {
    ::v-deep(.ant-upload) {
      min-height: 75px;
      color:  var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::v-deep(.ant-upload-list-item-container) {
      transition: unset;
    }

    &-item {
      height: 30px;
    }
  }
 }
</style>
