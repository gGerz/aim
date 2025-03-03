<template>
  <div class="actions">
    <AimButton size="big" color="cyan">Мои черновики</AimButton>
    <AimButton size="big" color="cyan">Сохранить черновик</AimButton>
  </div>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';


</script>
<style lang="scss" scoped>
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
}
</style>
