<template>
  <div class="spinner__container">
    <Spin/>
  </div>
</template>


<script lang="ts" setup>
import { Spin } from 'ant-design-vue';

</script>

<style lang="scss" scoped>
.spinner {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
    top: 0;
    left: 0;
    background: #ffffff;
    opacity: 0.4;
    border-radius: inherit;
    transition: opacity 0.3s;
  }
}
</style>
