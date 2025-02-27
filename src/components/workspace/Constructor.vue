<template>
  <div class="constructor">
    <Card>
    <template #title>
      Конфигурация
      <Tooltip title="Здравствуйте, я нейросеть AIM v1.0. Я могу помочь вам в оптимизации вашей работы на ЧПУ-станке. Введите, пожалуйста, ваши исходные данные и прикрепите STL-модель, чтобы мне было легче определить, какими инструментами вам стоит воспользоваться для выполнения задачи!">
        ( i )
      </Tooltip>
    </template>
    <div class="constructor__inputs">
      <div class="constructor__row">
        <label>
          <span>Выберите тип станка</span>
          <RadioGroup>
            <RadioButton>Фрезерный</RadioButton>
            <RadioButton>Токарный</RadioButton>
          </RadioGroup>
        </label>
      </div>
      <div class="constructor__row">
        <label>
          <span>Выберите тип стойки</span>
          <RadioGroup>
            <RadioButton>Стойка 1</RadioButton>
            <RadioButton>Стойка 2</RadioButton>
            <RadioButton>Стойка 3</RadioButton>
            <RadioButton>Стойка 4</RadioButton>
          </RadioGroup>
        </label>
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
    </div>
    <UploadDragger class="constructor__file">
      Прикрепите STL-Модель
    </UploadDragger>
    <AimButton class="constructor__button" size="big">Старт</AimButton>
  </Card>
  </div>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';
import { Card, UploadDragger, InputNumber, RadioButton, RadioGroup } from 'ant-design-vue';

</script>
<style lang="scss" scoped>
 .constructor {

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

  &__row {
    display: flex;
    flex-direction: column;

    > label {
      display: flex;
      flex-direction: column;
      margin: 0 0 8px 0;
    }
  }

  &__sizes {

    > span {
    }
  }

  &__size-inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
 }
</style>
