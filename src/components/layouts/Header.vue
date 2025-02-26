<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/logo.svg" alt="Logo" />
    </div>
    <div class="header__nav">
      <Button @click="goToHelp">Помощь</button>
      <Button @click="goToAbout">О проекте</button>
      <Button @click="goToAuth">Auth</button>
    </div>
  </header>
</template>


<script setup lang="ts">
import router from '@/router';
import { Button } from 'ant-design-vue';
const goToHelp = () => {

}
const goToAbout = () => {

}
const goToAuth = () => {
  router.push('/auth')
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--color-black);
  color:  var(--color-white);
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 2;
  &__logo {

    img {
      height: 50px;
    }
  }

  &__nav {
    display: flex;
    gap: 8px;
  }
}
</style>
