<template>
  <Card class="model-viewer">
    <template #title>
      Модель заготовки
    </template>
    <div>
      <model-stl
          :backgroundAlpha="0.5"
          :rotation="rotation"
          @load="onLoad"
          :src="stlFile"
        />
        Предварительный расчет времени: <span class="model-viewer__time">15</span> минут <span class="model-viewer__time">50</span> cекунд
    </div>
  </Card>
</template>
<script lang="ts" setup>
import stlFile from '@/assets/uzor.stl'
import { ModelStl } from 'vue-3d-model';
import { Card } from 'ant-design-vue';
import { reactive } from 'vue'


const rotation = reactive({
  x: -Math.PI / 2,
  y: 0,
  z: 0,
});

function onLoad() {
  rotate();
}

function rotate() {
  requestAnimationFrame(rotate);
  rotation.z += 0.01;
}


</script>

<style lang="scss" scoped>
 .model-viewer {
  background-color: var(--color-cyan);
  color: var(--color-white);
  border-color: transparent;
  border-radius: 20px;

  &__time {
    font-size: 24px;
    font-weight: 600;
  }

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
