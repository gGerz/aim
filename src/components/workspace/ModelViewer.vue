<template>
  <Card class="model-viewer">
    Предварительный расчет времени:
    <div class="model-viewer__timer">
      <div v-if="timer.days"><span class="model-viewer__time">{{timer.days}}</span> д</div>
      <div v-if="timer.hours"><span class="model-viewer__time">{{timer.hours}}</span> ч</div>
      <div v-if="timer.minutes"><span class="model-viewer__time">{{timer.minutes}}</span> м</div>
      <div v-if="timer.seconds"><span class="model-viewer__time">{{timer.seconds}}</span> c</div>
    </div>
    <!-- <template #title>
      Модель заготовки
    </template> -->
    <!-- <div>
      {{ fileExtension }}
    Предварительный расчет времени:
    <br> <span class="model-viewer__time">15</span> минут <span class="model-viewer__time">50</span> cекунд
    <model-stl
    v-if="fileExtension === 'stl'"
      :backgroundAlpha="0.5"
      :src="stlFile"
    />
    <img class="model-viewer__wip" src="@/assets/wip.webp" alt="Work in Progress"  />
    </div> -->
  </Card>
</template>
<script lang="ts" setup>
import stlFile from '@/assets/uzor.stl'
import { ModelStl  } from 'vue-3d-model';
import { Card } from 'ant-design-vue';
import { computed, reactive } from 'vue'
import type { IGcode } from '@/types/configurations';

type Props = {
  stlUrl: string
  gCodeData: IGcode
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


const convertSeconds = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

const timer = computed(() => convertSeconds(props.gCodeData.readyTime))

</script>

<style lang="scss" scoped>
 .model-viewer {
  background-color: var(--color-cyan);
  color: var(--color-white);
  border-color: transparent;
  border-radius: 20px;

  &__timer {
    display: flex;
    gap: 4px;
  }

  &__time {
    font-size: 24px;
    font-weight: 600;
    display: inline-block;
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
    flex-direction: row;
    align-items: center;
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
