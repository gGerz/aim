<template>
  <Card class="chat-window">
    <template #title>
      <div class="chat-window__title">
         <span>Диалог</span>
        <RobotOutlined/>
      </div>
    </template>
    <ChatMessages :messages="messages" />
    <ChatInput class="chat-window__input" @sendMessage="handleSendMessage" />
  </Card>
</template>

<script lang="ts" setup>
import {  onBeforeMount, onBeforeUnmount } from 'vue';
import ChatMessages from './ChatMessages.vue';
import ChatInput from './ChatInput.vue';
import { Card } from 'ant-design-vue';
import { RobotOutlined } from '@ant-design/icons-vue';
import { useWebSocket } from '@/composables/useWebsocket';

const { connect, send, messages, disconnect } = useWebSocket(import.meta.env.VITE_WS_URL)

onBeforeMount(() => {
  connect()
})

onBeforeUnmount(() => {
  disconnect()
})

const handleSendMessage = (message: string) => {
  messages.value.push({ message , isMy: true})
  send({ type: 'chat_message', message })
};

</script>

<style lang="scss" scoped>
.chat-window {
  background-color: var(--color-cyan);
  color: var(--color-white);
  border-color: transparent;
  border-radius: 20px;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__input {
    width: 100%;
  }

  ::v-deep(.ant-card-head) {
    color: var(--color-white);
    border-color: var(--color-orange);
  }

  ::v-deep(.ant-card-body) {
    overflow: hidden;
    display: grid;
    grid-template-rows: 1fr 58px;
    padding: 0;
    height: 100%;
    padding-top: 56px;
    margin-top: -56px;
    max-height: 625px;

    &:after {
      display: none;
    }
    &:before {
      display: none;
    }
  }
}
</style>
