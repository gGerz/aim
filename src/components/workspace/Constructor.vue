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
            <RadioButton value="a">Фрезерный</RadioButton>
            <RadioButton value="b">Токарный</RadioButton>
          </RadioGroup>
        </div>
      </div>
      <div class="constructor__row">
        <div  class="constructor__label">
          <span>Выберите тип стойки</span>
          <RadioGroup v-model:value="standType">
            <RadioButton value="1">Стойка 1</RadioButton>
            <RadioButton value="2">Стойка 2</RadioButton>
            <RadioButton value="3">Стойка 3</RadioButton>
            <RadioButton value="4">Стойка 4</RadioButton>
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


type ICreatePayload = {
  machine_type?: string,
  control_system?: string,
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
  draftData: any
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>()


const machineType = ref<string>('a');
const standType = ref<string>('2');
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

watch(() => props.draftData, (newVal) => {
  xSize.value = newVal.x_size
  ySize.value = newVal.y_size
  zSize.value = newVal.z_size
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
