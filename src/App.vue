<template>
  <div>
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>

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
