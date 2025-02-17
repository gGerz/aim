<template>
  <footer>
    <div class="footer-content">
      <p>&copy; 2025 AIM Project. Все права защищены.</p>
      <div class="links">
        <a href="/privacy-policy">Политика конфиденциальности</a>
        <a href="/terms-of-service">Пользовательское соглашение</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  min-height: 10vh;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content .links a {
  margin-left: 20px;
  color: #fff;
  text-decoration: none;
}

.footer-content .links a:hover {
  text-decoration: underline;
}
</style>
