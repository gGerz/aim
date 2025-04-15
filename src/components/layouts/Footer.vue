<template>
  <footer class="footer">
    <div class="footer__content">
      <p>AIM V1.0</p>
      <div class="links">
        <a href="/aim/help.pdf" target="_blank">Помощь</a>
        <a href="/aim/policy.pdf" target="_blank">Политика конфиденциальности</a>
        <a href="/aim/agreements.pdf" target="_blank">Пользовательское соглашение</a>
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

@media (max-width: 768px) {
  .footer {
    &__content {
      padding: 8px;
      flex-direction: column-reverse;
      gap: 12px;

      .links {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
      }
    }
  }
}
</style>
