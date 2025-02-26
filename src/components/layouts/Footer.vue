<template>
  <footer class="footer">
    <div class="footer__content">
      <p>AIM V1.0</p>
      <div class="links">
        <a href="/privacy-policy">Политика конфиденциальности</a>
        <a href="/terms-of-service">Пользовательское соглашение</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.footer {
  // background-color: var(--color-black);
  background-color: #000;
  color: var(--color-white);
  padding: 0 20px;
  min-height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__content {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
      display: flex;
      align-items: center;
      margin: 0;
    }
  }

  .links {
    a {
      margin-left: 20px;
      color: var(--color-white);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
