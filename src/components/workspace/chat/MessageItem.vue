<template>
  <div :class="{
    'message-item': true,
    'user': message.isMy,
    'bot': !message.isMy,
  }">
    {{ message.message }}
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from '@/types/messages';

defineProps<{ message: IMessage }>();
</script>


<style lang="scss" scoped>
.message-item {
  max-width: 70%;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 5px;
}
.user {
  align-self: flex-end;
  background-color: var(--color-orange);
  color: var(--color-black);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    right: -11px;
    bottom: 8px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent transparent var(--color-orange);
  }
}
.bot {
  align-self: flex-start;
  background-color: var(--color-cyan);
  color: var(--color-white);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: -11px;
    bottom: 8px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent var(--color-cyan) transparent transparent;
  }
}
</style>
