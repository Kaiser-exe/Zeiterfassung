<script setup lang="ts">
//make one db get request after login
//one variable for db-data, one for viewing-data and one for insert-data/edit-data
//after save the insert-data get reset and viewing-data will become the new db-data and teh viewing-data stays the same
//with that I don't need multiple db requests
</script>

<template>
  <div>
    <h1>I am INDEX</h1>
    <button>
      <NuxtLink to="/login">Login</NuxtLink>
    </button>
    <button>
      <NuxtLink to="/admin">Admin</NuxtLink>
    </button>
    <button>
      <NuxtLink to="/employee">Employee</NuxtLink>
    </button>
  </div>
</template>

<style scoped>

</style>