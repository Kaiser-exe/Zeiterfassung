<script setup lang="ts">
const logins = await (await useFetch('/api/getLogin')).data.value

const showError = ref<boolean>(false)
const loggedIn = ref<boolean>(false)
const inputUsername = ref<string>('')
const inputPassword = ref<string>('')

const checkLoginData = () => {
  if (logins.filter(login => login.username === inputUsername.value && login.password === inputPassword.value).length > 0) {
    loggedIn.value = true
  } else {
    showError.value = true
  }
}

watch(
    () => loggedIn.value,
    () => {
      if (logins.filter(login => login.username === inputUsername.value)[0].admin === 1) {
        navigateTo('/admin')
      } else {
        navigateTo('/employee')
      }
    }
)

console.log(logins)
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