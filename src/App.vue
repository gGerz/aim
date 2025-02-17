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
  min-height: 80vh;
  height: 100%;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
