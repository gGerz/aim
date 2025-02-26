<template>
  <div class="auth-form">
    <Card class="auth-form__card">
      <h2 class="auth-form__title">Авторизация</h2>
      <label class="auth-form__input">
        <span>Имя пользователя</span>
        <Input placeholder="Введите имя пользователя"/>
      </label>
      <label class="auth-form__input-password">
        <span>Пароль</span>
        <InputPassword placeholder="Введите пароль"/>
      </label>
      <Button class="auth-form__button" @click="onAuthClick">Войти</Button>
    </Card>
    <p class="auth-form__subtext">Версия ОС: Windows 10 и выше</p>
  </div>
</template>

<script lang="ts" setup>
import { Button, Card, Input, InputPassword } from 'ant-design-vue';
import router from '@/router';
const onAuthClick = () => {
  router.push('/')
}

</script>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  width: 100%;

  &__card {
    background-color: var(--color-cyan);
    max-width: 400px;
    width: 100%;
    border-color: var(--color-orange);
    border-radius: 20px;

    ::v-deep(.ant-card-body) {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 20px;
      padding: 32px 24px;

      &::before {
        display: none;
      }

      &::after {
        display: none;
      }
    }
  }

  &__title {
    color: var(--color-white);
    text-align: center;
    margin: 0;

    font-size: 23px;
    line-height: 30px;
    font-weight: 500;
  }

  &__input {
    font-weight: 400;
    font-size: 14px;
    color: var(--color-white);

    span {
      margin: 0 0 4px 0;
    }
    input {
      border-radius: 14px;
      height: 50px;
    }
  }
  &__input-password {
    font-weight: 400;
    font-size: 14px;
    color: var(--color-white);

    span {
      margin: 0 0 4px 0;
    }

    .ant-input-password {
      border-radius: 14px;
      height: 50px;
    }
  }

  &__button {
    margin: 8px 0 0 0;
    height: 55px;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
  }

  &__subtext {
    color: var(--color-orange);
  }
}
</style>
