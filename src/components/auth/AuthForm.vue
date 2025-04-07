<template>
  <form class="auth-form">
    <Card class="auth-form__card">
      <h2 class="auth-form__title">Авторизация</h2>
      <label class="auth-form__input">
        <span>Имя пользователя</span>
        <Input v-model:value="authForm.userName" name="login" placeholder="Введите имя пользователя"/>
      </label>
      <label class="auth-form__input-password">
        <span>Пароль</span>
        <InputPassword v-model:value="authForm.password"  name="password" placeholder="Введите пароль"/>
      </label>
      <AimButton
        :disabled="isButtonDisabled"
        :loading="isLoading" size="big"
        class="auth-form__button"
        @click="onAuthClick"
      >Войти</AimButton>
    </Card>
    <p class="auth-form__subtext">Версия ОС: Windows 10 и выше</p>
  </form>
</template>

<script lang="ts" setup>
import { Card, Input, InputPassword } from 'ant-design-vue';
import router from '@/router';
import { notification } from 'ant-design-vue';
import AimButton from '@/ui/buttons/AimButton.vue';
import { ref } from 'vue';
import http from '@/services/http';
import { computed } from 'vue';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const isLoading = ref(false)
const authForm = ref({
  userName: 'german1',
  password: '123456qW!'
})

const isButtonDisabled = computed(() => !authForm.value.password || !authForm.value.userName)

const onAuthClick = () => {
  isLoading.value = true

  // http.post('register/', {
  //   username: authForm.value.userName,
  //   email: 'testing@mail.ru',
  //   password: authForm.value.password,
  //   password2: authForm.value.password,
  // })

  http.post('login/', {
    username: authForm.value.userName,
    password: authForm.value.password,
  }).then((res) => {
    authStore.login({
      access: res.data.access,
      refresh: res.data.refresh,
    })
    setTimeout(() => {
      router.push('/')
    }, 0)
  }).catch((err) => {
    notification.error({
      message: err.response.data.error,
      description: 'Попробуйте ввести другой логин или пароль'
    })
  }).finally(() => {
    // isLoading.value = false
  })
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
    border-color: transparent;
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
  }

  &__subtext {
    color: var(--color-orange);
  }
}
</style>
