<template>
  <div class="actions">
    <AimButton size="big" color="cyan" @click="emit('change-configuration')" :disabled="configurationCounter === 0">Сменить черновик (Всего: {{configurationCounter}})</AimButton>
    <AimButton size="big" color="cyan" @click="emit('save-configuration')">Сохранить черновик</AimButton>
    <AimButton size="big" color="cyan" @click="emit('clear-all-configurations')" :disabled="configurationCounter === 0">Очистить черновики</AimButton>
  </div>
</template>
<script lang="ts" setup>
import AimButton from '@/ui/buttons/AimButton.vue';

const emit = defineEmits<{
  'change-configuration': []
  'save-configuration': []
  'clear-all-configurations': []
}>()

interface IProps {
  configurationCounter: number
}

withDefaults(defineProps<IProps>(), {
  configurationCounter: 0,
})

</script>
<style lang="scss" scoped>
.actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
}
 @media (max-width: 776px) {
  .actions {
    grid-template-columns: 1fr;
  }
 }
</style>
