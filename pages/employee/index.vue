<script setup lang="ts">

</script>

<template>
  <div>
    <div style="width: 500px; height: 750px; background: lightblue;">
      Calendar Placeholder
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