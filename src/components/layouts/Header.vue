<template>
  <header>
    <div class="logo">
      logo
      <!-- <img src="@/assets/logo.png" alt="Logo" /> -->
    </div>
    <div class="nav">
      <button @click="goToHelp">Помощь</button>
      <button @click="goToAbout">О проекте</button>
      <button @click="goToAuth">Auth</button>
    </div>
  </header>
</template>


<script setup lang="ts">
import router from '@/router';
const goToHelp = () => {

}
const goToAbout = () => {

}
const goToAuth = () => {
  router.push('/auth')
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 20px;
  color: white;
  min-height: 10vh;
}

.logo img {
  height: 50px;
}

.nav button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.nav button:hover {
  background-color: #0056b3;
}
</style>
