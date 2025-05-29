<script setup lang="ts">
import {useGlobalStore} from "@/stores/global";
import type {Expected} from '../composables/types'
import dayjs from "dayjs";

const store = useGlobalStore();
const showAdding = ref<boolean>(false);
const name = ref<string>('')
const userName = ref<string>('')
const password = ref<string>('')
const vacation = ref<number>(0)
const entry = ref()
const timeModel = ref<string[]>(new Array(7))

const getTimeModel = (expected: Expected[]) => {
  let total = 0
  let retVal = ''

  for (const expect of expected) {
    total += expect.hours
    retVal = `${retVal} ${expect.weekday.substring(0, 2)} - ${expect.hours / 60}h;`
  }

  return `${total / 60} --> ${retVal.substring(0, retVal.length - 1)}`
}

const handleDetailClick = async (userId: string) => {
  await store.fetchUser(userId)
  navigateTo('/admin/detail')
}

const saveUser = async () => {
  const expected: Expected[] = ([])
  let counter = 0

  while (counter < timeModel.value.length) {
    if (timeModel.value[counter]) {
      expected.push({id: '', hours: Number(timeModel.value[counter]) * 60, weekday: counter + 1})
    }
    counter++
  }

  await store.insertUser({
    id: '',
    firstName: name.value.substring(0, name.value.indexOf(' ')),
    lastName: name.value.substring(name.value.indexOf(' ') + 1),
    entry: dayjs(entry.value).format('YYYY-MM-DD'),
    vacation: vacation.value * 60,
    userName: userName.value,
    password: password.value,
    timeComp: 0,
    worked: [],
    expected: expected,
  })

  await store.fetchAdminOverview()

  showAdding.value = false
}

const cancelUser = async () => {
  showAdding.value = false
}
</script>

<template>
  <div>
    <div v-for="data in store.overviewData" :key="data.id" @click="handleDetailClick(data.id.toString())">
      <h3>{{ data.name }}</h3>
      <div>{{ getTimeModel(data.expected) }}</div>
      <div>Urlaub: {{ data.vacation / 60 }}h</div>
      <div>Zeitausgleich: {{ data.timeComp / 60 }}h</div>
    </div>
    <button @click="showAdding = true">Mitarbeiter hinzufügen</button>
    <div v-if="showAdding">
      <div>Zeitmodell</div>
      <table>
        <tbody>
        <tr v-for="(weekday, index) in store.weekdays" :key="index">
          <td>{{ weekday }}</td>
          <td><input v-model="timeModel[index]"></td>
        </tr>
        </tbody>
      </table>
      <div>
        <span>Name: </span>
        <input v-model="name">
      </div>
      <div>
        <span>Urlaubsanspruch: </span>
        <input v-model="vacation" type="number">
      </div>
      <div>
        <span>Eintrittsdatum: </span>
        <input v-model="entry" type="date">
      </div>
      <div>
        <span>Benutzername: </span>
        <input v-model="userName">
      </div>
      <div>
        <span>Passwort: </span>
        <input v-model="password">
      </div>
      <button @click="cancelUser">Cancel</button>
      <button @click="saveUser">Save</button>
    </div>
  </div>
</template>

<style scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  padding: 5px;
  min-width: 50px;
}

td {
  align-self: end;
}
</style>