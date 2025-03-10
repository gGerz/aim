<template>
  <Card class="model-viewer">
    <template #title>
      Модель заготовки
    </template>
  </Card>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';
import { Card } from 'ant-design-vue';

type Emits = {
  'on-start-click': []
}
const emit = defineEmits<Emits>()


const onStartClick = () => {
  emit('on-start-click')
}

</script>
<style lang="scss" scoped>
 .model-viewer {
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
 }
</style>
