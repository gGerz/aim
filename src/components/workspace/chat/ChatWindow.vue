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
import { ref } from 'vue';
import ChatMessages from './ChatMessages.vue';
import ChatInput from './ChatInput.vue';
import { Card } from 'ant-design-vue';
import { RobotOutlined } from '@ant-design/icons-vue';
import type { IMessage } from '@/types/messages';

const messages = ref<IMessage[]>([
  { id: 1, text: 'Привет! Я робот, не бойся меня, я друг! Я тебя не обижу, давай сидеть и смотреть друг другу в глаза. Спроси меня любой вопрос и я постараюсь тебе на него ответить!', sender: 'bot' },
  { id: 2, text: 'Как дела?', sender: 'user' },
]);

const handleSendMessage = (message: string) => {
  messages.value.push({ id: Date.now(), text: message, sender: 'user' });
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
    max-height: 565px;

    &:after {
      display: none;
    }
    &:before {
      display: none;
    }
  }
}
</style>
