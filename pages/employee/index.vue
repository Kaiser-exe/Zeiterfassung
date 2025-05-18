<script setup lang="ts">
import dayjs from "dayjs";

const days = dayjs('2025-04-01').daysInMonth()
</script>

<template>
  <div>
    <div style="width: 500px; height: 750px; background: lightblue;">
      Calendar Placeholder
    </div>
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
        <tr v-for="day in days" :key="day">
          <td>{{ dayjs('2025-04-01' + day).date(day).day() }}</td>
          <td>{{ dayjs('2025-04-01').date(day).format('DD.MM.YYYY') }}</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </div>
    <div>
      <div>Übersicht</div>
      <table>
        <tbody>
        <tr>
          <td>Urlaub</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Krankentage</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Zeitausgleich</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Zeitausgleich bis Vormonat</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Zeitausgleich diesen Monat</td>
          <td>0</td>
        </tr>
        </tbody>
      </table>
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