<script setup lang="ts">
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import {useGlobalStore} from "@/stores/global";
import type {Expected, Worked} from '../composables/types'

dayjs.extend(isSameOrBefore)

const store = useGlobalStore();
const currentDate = ref(dayjs())
const substractMonths = ref<number>(1)
const worked = ref<Worked | undefined>()
const expected = ref<Expected | undefined>()
const editing = ref<boolean>(false)
let timeComp = 0
const defaultWorked = () => ({
  id: store.userData[0].id,
  startTime: undefined,
  endTime: undefined,
  break: undefined,
  absence: undefined
})
const insertWorked = ref<Worked[]>(Array.from({length: 31}, () => defaultWorked()))

const getWorkedExpected = (day: number) => {
  worked.value = store.userData[0].worked.filter(w => dayjs(w.startTime).format('DD.MM.YYYY') === currentDate.value.date(day).format('DD.MM.YYYY'))[0]
  expected.value = store.userData[0].expected.filter(e => e.weekdays === store.weekdays[currentDate.value.date(day).day()])[0]
}

const getDiff = (day: number) => {
  if (currentDate.value.date(day).isSameOrBefore(dayjs(), 'day')) {
    if (expected.value && worked.value) {
      timeComp += ((dayjs(worked.value.endTime).diff(dayjs(worked.value.startTime), 'hour', true) - worked.value.break / 60) - (expected.value.hours / 60))
      return (dayjs(worked.value.endTime).diff(dayjs(worked.value.startTime), 'hour', true) - worked.value.break / 60) - (expected.value.hours / 60)
    } else if (worked.value) {
      timeComp += (dayjs(worked.value.endTime).diff(dayjs(worked.value.startTime), 'hour', true) - worked.value.break / 60)
      return dayjs(worked.value.endTime).diff(dayjs(worked.value.startTime), 'hour', true) - worked.value.break / 60
    } else if (expected.value) {
      timeComp += ((expected.value.hours / 60) * -1)
      return (expected.value.hours / 60) * -1
    }
  }

  return undefined
}

const getSickdays = () => {
  const year = currentDate.value.year().toString()
  const absences = store.userData[0].worked.filter(w => dayjs(w.startTime).format('YYYY') === year)

  return absences.filter(a => a.absence && a.absence.name === store.absence[0]).length
}

const checkDayEmpty = (day: number) => {
  if (store.userData[0].worked) {
    if (store.userData[0].worked.filter(w => dayjs(w.startTime).isSame(currentDate.value.date(day), 'day')).length > 0) {
      return false
    }
  }

  return true
}

const getHoliday = () => {
  let sum = 0
  for (const work in worked.value) {
    if (work.absence && work.absence.name === 'Urlaub') {
      sum += dayjs(work.endTime).diff(dayjs(work.startTime), 'hour', true)
    }
  }

  return sum
}

const saveClick = async () => {
  await store.insertWorked(insertWorked.value.filter(insertWork => insertWork.startTime && insertWork.endTime && insertWork.break))

  await store.fetchUser(store.userData[0].id.toString())

  insertWorked.value = Array.from({length: 31}, () => defaultWorked())

  editing.value = false
}

const cancelClick = () => {
  editing.value = false
}

watch(
    () => substractMonths.value,
    () => {
      currentDate.value = dayjs().subtract(substractMonths.value, 'month').startOf('month')
    },
    {immediate: true, deep: true}
)
</script>

<template>
  <div>
    <div class="calendar">
      <table>
        <tr>
          <th>Wochentag</th>
          <th>Datum</th>
          <th>Abwesenheitsart</th>
          <th>Beginn</th>
          <th>Ende</th>
          <th>Pause</th>
          <th>Ist</th>
          <th>Soll</th>
          <th>Differenz</th>
        </tr>
        <tr v-for="day in currentDate.daysInMonth()" :key="day">
          <td style="display: none">
            {{ getWorkedExpected(day) }}
          </td>
          <td>{{ store.weekdays[currentDate.date(day).day()] }}</td>
          <td>{{ currentDate.date(day).format('DD.MM.YYYY') }}</td>
          <td v-if="editing && checkDayEmpty(day)">
            <select v-model="insertWorked[day].absence">
              <option key="none" :value="undefined"/>
              <option v-for="absence in store.absence" :key="absence.id" :value="absence.id">{{ absence.name }}</option>
            </select>
          </td>
          <td v-else>{{ worked ? worked.absence : undefined }}</td>
          <td v-if="editing && checkDayEmpty(day)">
            <input v-model="insertWorked[day].startTime" type="datetime-local">
          </td>
          <td v-else>{{ worked ? dayjs(worked.startTime).format('HH:mm') : undefined }}</td>
          <td v-if="editing && checkDayEmpty(day)">
            <input v-model="insertWorked[day].endTime" type="datetime-local">
          </td>
          <td v-else>{{ worked ? dayjs(worked.endTime).format('HH:mm') : undefined }}</td>
          <td v-if="editing && checkDayEmpty(day)">
            <input v-model="insertWorked[day].break" type="number">
          </td>
          <td v-else>{{ worked ? worked.break / 60 : undefined }}</td>
          <td>{{
              worked ? dayjs(worked.endTime).diff(dayjs(worked.startTime), 'hour', true) - worked.break / 60 : undefined
            }}
          </td>
          <td>{{ expected ? expected.hours / 60 : undefined }}</td>
          <td>{{ getDiff(day) }}</td>
        </tr>
      </table>
    </div>
    <div>
      <div>Übersicht</div>
      <table>
        <tbody>
        <tr>
          <td>Urlaub in Stunden</td>
          <td>{{ store.userData[0].vacation / 60 }}</td>
        </tr>
        <tr>
          <td>Krankentage</td>
          <td>{{ getSickdays() }}</td>
        </tr>
        <tr>
          <td>Zeitausgleich</td>
          <td>{{ store.userData[0].timeComp }}</td>
        </tr>
        <tr>
          <td>Urlaub dieses Monat</td>
          <td>{{ getHoliday() }}</td>
        </tr>
        <tr>
          <td>Überstunden dieses Monat</td>
          <td>{{ timeComp / 60 }}</td>
        </tr>
        <tr>
          <td>Zeitausgleich bis Vormonat</td>
          <td>???</td>
        </tr>
        <tr>
          <td>Zeitausgleich diesen Monat</td>
          <td>???</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!editing">
      <button @click="editing = true">Edit</button>
    </div>
    <div v-else>
      <button @click="cancelClick">Cancel</button>
      <button @click="saveClick">Save</button>
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