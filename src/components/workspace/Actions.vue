<template>
  <div class="actions">
    <AimButton>Мои черновики</AimButton>
    <AimButton>Сохранить черновик</AimButton>
    <AimButton>Очистить историю</AimButton>
    <AimButton>Перезапуск</AimButton>
  </div>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';


</script>
<style lang="scss" scoped>
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 12px;
}
</style>
