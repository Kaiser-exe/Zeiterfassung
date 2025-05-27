<script setup lang="ts">
import {useGlobalStore} from "@/stores/global";
import type {Expected} from '../composables/types'

const store = useGlobalStore();

const getTimeModel = (expected: Expected[]) => {
  let total = 0
  let retVal = ''

  for (const expect of expected) {
    total += expect.hours
    retVal = `${retVal} ${expect.weekday.substring(0, 2)} - ${expect.hours / 60}h;`
  }

  return `${total / 60} --> ${retVal.substring(0, retVal.length - 1)}`
}

const handleClick = async () => {
  await store.fetchUser('1')
  navigateTo('/admin/detail')
}
</script>

<template>
  <div>
    <div v-for="data in store.overviewData" :key="data.id" @click="handleClick">
      <h3>{{ data.name }}</h3>
      <div>{{ getTimeModel(data.expected) }}</div>
      <div>Urlaub: {{ data.vacation / 60 }}h</div>
      <div>Zeitausgleich: {{ data.timeComp / 60 }}h</div>
    </div>
    <button>Mitarbeiter hinzufügen</button>
  </div>
</template>

<style scoped>

</style>