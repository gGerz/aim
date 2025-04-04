<template>
  <header class="header">
    <div class="header__logo">
      <img src="@/assets/logo.svg" alt="Logo" />
    </div>
    <div class="header__nav">
      <AimButton v-if="authStore.isAuthenticated" @click="onLogout">Выйти</AimButton>
    </div>
  </header>
</template>


<script setup lang="ts">
import router from '@/router';
import AimButton from '@/ui/buttons/AimButton.vue';
import { useAuthStore } from '@/store/authStore';
import http from '@/services/http';
import Cookies from 'js-cookie';
const authStore = useAuthStore()

const goToHelp = () => {

}
const goToAbout = () => {

}
const onLogout = () => {
  http.post('logout/', {
    access: Cookies.get('access_token'),
    refresh: Cookies.get('refresh_token')
  }).then(() => {
    authStore.logout()
    router.push('/auth')
  })
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  // background-color: var(--color-black);
  background-color: rgba(43, 52, 49, 0.5);
  color:  var(--color-white);
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 2;
  &__logo {

    img {
      height: 40px;
    }
  }

  &__nav {
    display: flex;
    gap: 8px;
  }
}
</style>
