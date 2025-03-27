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
          <RadioGroup v-model:value="machineType">
            <RadioButton v-for="machine in configuration" :key="machine.id" :value="machine">{{machine.name}}</RadioButton>
          </RadioGroup>
        </div>
      </div>
      <div class="constructor__row">
        <div  class="constructor__label">
          <span>Выберите тип стойки</span>
          <RadioGroup v-model:value="standType">
            <RadioButton v-for="control in machineType?.controls" :key="control.id" :value="control">{{control.name}}</RadioButton>
          </RadioGroup>
        </div>
      </div>
      <div class="constructor__row">
        <label class="constructor__sizes">
          <span>Введите размер заготовки</span>
          <div class="constructor__size-inputs">
            <InputNumber v-model:value="xSize">
            <template #addonBefore>
              x
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          <InputNumber v-model:value="ySize">
            <template #addonBefore>
              y
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          <InputNumber v-model:value="zSize">
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
            <InputNumber  v-model:value="diameter">
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
      <UploadDragger :maxCount="1" v-model:file-list="stlFile">
        Прикрепите STL-Модель
      </UploadDragger>
      <div class="constructor__file-item" v-if="!stlFile.length"></div>
    </div>
    <AimButton class="constructor__button" size="big" @click="onStartClick">Старт</AimButton>
  </Card>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';
import { Card, UploadDragger, InputNumber, RadioButton, RadioGroup } from 'ant-design-vue';
import { ref, watch } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import type { IConfiguration, IControl, IDraft } from '@/types/configurations';


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


const machineType = ref<IConfiguration>();
const standType = ref<IControl>();
const xSize = ref<number>();
const ySize = ref<number>();
const zSize = ref<number>();
const diameter = ref<number>();
const stlFile = ref([]);

const onStartClick = () => {
  const payload = {
    machine_type: machineType.value,
    control_system: standType.value,
    x_size: xSize.value,
    y_size: ySize.value,
    z_size: zSize.value,
    diameter: diameter.value,
    stl_file: '',
  }
  emit('on-start-click', payload)
}

watch(() => props.configuration, (newVal) => {
  machineType.value = newVal?.[0]
  standType.value = newVal?.[0].controls?.[0]
})

watch(machineType, (newVal) => {
  const findStand = newVal?.controls.find((control) => control.type === standType.value?.type)
  if (!!findStand) {
    standType.value = findStand
  } else {
    standType.value = newVal?.controls?.[0]
  }
})

watch(() => props.draft, (newVal) => {
  machineType.value = props.configuration?.find((conf) => conf.type === newVal?.machine_type)

  const standIndex = props.configuration?.findIndex((conf) => conf.type === newVal?.machine_type) || 0
  standType.value = props.configuration?.[standIndex].controls.find((control) => control.type === newVal?.control_system)

  xSize.value = newVal?.x_size
  ySize.value = newVal?.y_size
  zSize.value = newVal?.z_size
  diameter.value = newVal?.diameter
})

defineExpose({
  machine_type: machineType,
  control_system: standType,
  x_size: xSize,
  y_size: ySize,
  z_size: zSize,
  diameter: diameter,
  stl_file: stlFile,
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
