<template>
  <ConfigProvider
    :theme="{
        token: {
          colorTextBase: '#333', // Цвет текста по умолчанию
          colorPrimary: '#ffcb9b',
        },
      }"
  >
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue';
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
</script>

<style scoped>
main {
  min-height: 95vh;
  height: 100%;
  display: flex;

  & > :first-child {
    flex-grow: 1;
  }
}
</style>
