<script setup lang="ts">
const users = await useFetch('/api/getTestDbData').data.value[0][0]
const newUsers = await users.data.value[0][0]

console.log(newUsers.value)
</script>
<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <div class="header__title">Login</div>
    </div>
    <div class="wrapper__body">
      <div class="body__name">
        <div class="name__label">Username:</div>
        <input class="name__input">
      </div>
      <div class="body__password">
        <div class="password__label">Password:</div>
        <input class="password__input">
      </div>
    </div>
    <div class="wrapper__footer">
      <button class="footer__login">Login</button>
    </div>
    <span>Name: </span> {{ newUsers.us_lName }}
  </div>
</template>
<style></style>