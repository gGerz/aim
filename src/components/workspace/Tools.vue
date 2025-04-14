<template>
  <Card class="tools">
    <template #title>
      <div class="tools__title">
        <AimButton :is-full-width="false" color="cyan" @click="onBackClick">Назад</AimButton>
        Рекомендуемые инструменты
      </div>
    </template>
    <div class="tools__attention">
      Обратите внимание, инструменты не подлежат изменению!
    </div>
    <List class="tools__list" :data-source="tools" :loading="false">
      <template #renderItem="{ item }">
        <ListItem>
          <template #actions>
            <div class="tools__badge">T8</div>
          </template>
          <b>{{ item.name }}</b>
        </ListItem>
      </template>
    </List>
  </Card>
</template>
<script lang="ts" setup>
import type { ITool } from '@/types/configurations';
import AimButton from '@/ui/buttons/AimButton.vue';
import { Card, List, ListItem } from 'ant-design-vue';
type Props = {
  tools: ITool[]
  loading: boolean
}
type Emits = {
  'on-start-click': []
  'on-back-click': []
}
defineProps<Props>()
const emit = defineEmits<Emits>()

const onBackClick = () => {
  emit('on-back-click')
}

</script>
<style lang="scss" scoped>
 .tools {
  background-color: var(--color-cyan);
  color: var(--color-white);
  border-color: transparent;
  border-radius: 20px;
  max-height: 815px;

  &__title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__controls {
    display: grid;
    gap: 16px;
    padding: 0 24px 12px;
  }

  &__badge {
    background: var(--color-white);
    padding: 8px 12px;
    border-radius: 12px;
    min-width: 50px;
  }

  &__list {
    overflow: auto;
    max-height: 705px;
  }

  &__attention {
    border-top: 1px solid var(--color-orange);
    padding: 8px 24px 0;
  }

  ::v-deep(.ant-card-head) {
    color: var(--color-white);
    border-color: var(--color-orange);
  }
  ::v-deep(.ant-list-empty-text) {
    display: none;
  }
  ::v-deep(.ant-card-body) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;

    &:after {
      display: none;
    }
    &:before {
      display: none;
    }
  }
  ::v-deep(.ant-list-items) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 24px 24px;
    margin-top: 2px;
  }
  ::v-deep(.ant-list-item) {
    background: var(--color-orange);
    border-radius: 8px;
    height: fit-content;
  }

  /* Styling the scrollbar */
  ::-webkit-scrollbar {
    width: 12px; /* Adjust width to match the design */
    background-color: #1e2d2f; /* Background color similar to the UI */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #4f7a7f; /* Thumb color (can be adjusted to match the design better) */
    border-radius: 10px; /* Round the edges for a more polished look */
    border: 3px solid #1e2d2f; /* Border color around the thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: #1e2d2f; /* Track background color */
    border-radius: 10px; /* Rounded track edges */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3b5a5c; /* Hover effect for the thumb */
  }

 }
</style>
