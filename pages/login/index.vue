<script setup lang="ts">
import {useGlobalStore} from "@/stores/global";

const store = useGlobalStore();
const logins = await (await useFetch('/api/getLogin')).data.value

const showError = ref<boolean>(false)
const inputUsername = ref<string>('')
const inputPassword = ref<string>('')

const checkLoginData = async () => {
  if (logins.filter(login => login.username === inputUsername.value && login.password === inputPassword.value && !login.departure).length > 0) {
    if (logins.filter(login => login.username === inputUsername.value)[0].admin === 1) {
      navigateTo('/admin')
      await store.fetchAdminOverview()
    } else {
      await store.fetchUser('1')
      navigateTo('/employee')
    }
  } else {
    showError.value = true
  }
}
</script>
<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <div class="header__title">Login</div>
    </div>
    <div class="wrapper__body">
      <div class="body__name">
        <div class="name__label">Username:</div>
        <input v-model="inputUsername" class="name__input">
      </div>
      <div class="body__password">
        <div class="password__label">Password:</div>
        <input v-model="inputPassword" class="password__input">
      </div>
      <div v-if="showError" class="body__error">Username or password does not exist!</div>
    </div>
    <div class="wrapper__footer">
      <button class="footer__login" @click="checkLoginData">Login</button>
    </div>
  </div>
</template>
<style></style>