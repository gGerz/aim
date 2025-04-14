<template>
  <Card class="model-viewer">
    <template #title>
      Модель заготовки
    </template>
    <div>
      {{ fileExtension }}
    Предварительный расчет времени:
    <br> <span class="model-viewer__time">15</span> минут <span class="model-viewer__time">50</span> cекунд
    <model-stl
    v-if="fileExtension === 'stl'"
      :backgroundAlpha="0.5"
      :src="stlFile"
    />
    <img class="model-viewer__wip" src="@/assets/wip.webp" alt="Work in Progress"  />
    </div>
  </Card>
</template>
<script lang="ts" setup>
import stlFile from '@/assets/uzor.stl'
import { ModelStl  } from 'vue-3d-model';
import { Card } from 'ant-design-vue';
import { computed, reactive } from 'vue'

type Props = {
  stlUrl: string
}
const props = defineProps<Props>()

const fileExtension = computed(() => {

  return props.stlUrl.split('.').pop()?.toLowerCase()
})


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

  &__wip {
    width: 100%;
  }

  ::v-deep(.ant-card-head) {
    color: var(--color-white);
    border-color: var(--color-orange);
  }
  ::v-deep(.ant-card-body) {
    padding: 12px 24px;
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
