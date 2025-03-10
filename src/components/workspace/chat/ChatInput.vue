<template>
  <div class="chat-input">
    <Input
      v-model:value="message"
      placeholder="Введите сообщение..."
      @press-enter="sendMessage"
  />
  <AimButton :is-full-width="false" @click="sendMessage"><SendOutlined /></AimButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SendOutlined } from '@ant-design/icons-vue';

import { Input } from 'ant-design-vue';
import AimButton from '@/ui/buttons/AimButton.vue';

const message = ref('');
const emit = defineEmits(['sendMessage']);

const sendMessage = () => {
  if (message.value.trim()) {
    emit('sendMessage', message.value);
    message.value = '';
  }
};
</script>

<style lang="scss" scoped>
.chat-input {
  display: grid;
  grid-template-columns: 1fr 46px;
  gap: 8px;
  padding: 12px 8px;
  border-top: 1px solid var(--color-orange)
}
</style>
