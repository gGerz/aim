<template>
  <div class="chat-messages" ref="messagesContainer">
    <MessageItem v-for="msg in messages" :key="msg.id" :message="msg"  />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import MessageItem from './MessageItem.vue';
const props = defineProps({ messages: Array });

const messagesContainer = ref<HTMLElement | null>(null);

watch(() => props.messages, async () => {
  await nextTick();

  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}, {deep: true});
</script>

<style lang="scss" scoped>
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: var(--color-cyan-light);

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
