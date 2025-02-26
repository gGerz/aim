<template>
  <div class="auth-view">
    <AuthForm/>
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/components/auth/AuthForm.vue';
</script>

<style lang="scss" scoped>

 .auth-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: var(--color-black);
 }
</style>
