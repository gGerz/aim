<template>
  <Button class="aim-button" :class="[
    `aim-button--${size}`,
    `aim-button--${color}`,
    { 'aim-button--full': isFullWidth }
  ]">
    <slot></slot>
  </Button>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue';
import { withDefaults } from 'vue';

withDefaults(defineProps<{
  size?: 'small' | 'medium' | 'big' | 'extra-big',
  color?: 'orange' | 'cyan',
  isFullWidth?: boolean
}>(),
{
  size: 'medium',
  color: 'orange',
  isFullWidth: true
})

</script>
<style lang="scss" scoped>
 .aim-button {

  &--full {
    width: 100%;
  }

  &--orange {
    background-color: var(--color-orange);

    &:hover {
      color: rgb(84 84 84 / 68%);
    }
  }


  &--cyan {
    background-color: var(--color-cyan);
    color: var(--color-white);

    &:hover {
      color: rgba(255, 255, 255, 0.68);
    }
  }

  &--big {
    height: 55px;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
    padding: 10px 12px;
  }

  &--extra-big {
    height: 120px;
    border-radius: 26px;
    font-size: 32px;
    font-weight: 600;
    padding: 20px 24px;
  }
 }
</style>
