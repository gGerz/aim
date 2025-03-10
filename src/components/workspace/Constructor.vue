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
            <InputNumber class="">
            <template #addonBefore>
              x
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          <InputNumber>
            <template #addonBefore>
              y
            </template>
            <template #addonAfter>
              mm
            </template>
          </InputNumber>
          <InputNumber>
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
            <InputNumber class="">
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
    <UploadDragger class="constructor__file">
      Прикрепите STL-Модель
    </UploadDragger>
    <AimButton class="constructor__button" size="big" @click="onStartClick">Старт</AimButton>
  </Card>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';
import { Card, UploadDragger, InputNumber, RadioButton, RadioGroup } from 'ant-design-vue';
import { ref } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

type Emits = {
  'on-start-click': []
}
const emit = defineEmits<Emits>()


const machineType = ref<string>('a');
const standType = ref<string>('2');

const onStartClick = () => {
  emit('on-start-click')
}

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
  }
 }
</style>
