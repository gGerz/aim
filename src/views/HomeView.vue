<template>
  <div class="home-view">
    <div class="home-view__content">
      <Button>Начать работу</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'ant-design-vue';
</script>

<style lang="scss">
.home-view {
  position: relative;
  background-color: var(--color-black);
  background-image: url('../assets/cpu.png');
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
    justify-content: center;
    align-items: center;
  }
}
</style>
