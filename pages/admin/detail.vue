<script setup lang="ts">

</script>

<template>
  <div>
    <div>
      <div>
        <div>Zeitmodell</div>
        <table>
          <tbody>
          <tr>
            <td>Montag</td>
            <td>0h</td>
          </tr>
          <tr>
            <td>Dienstag</td>
            <td>0h</td>
          </tr>
          <tr>
            <td>Mittwoch</td>
            <td>0h</td>
          </tr>
          <tr>
            <td>Donnerstag</td>
            <td>0h</td>
          </tr>
          <tr>
            <td>Freitag</td>
            <td>0h</td>
          </tr>
          <tr>
            <td>Samstag</td>
            <td>0h</td>
          </tr>
          <tr>
            <td>Sonntag</td>
            <td>0h</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div>Auswertung</div>
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
      <div>
        Calendar Placeholder
      </div>
    </div>
    <div>
      <div>Mittwoch 01.01.2025</div>
      <div>
        <span>Abwesenheit wegen </span>
        <select>
          <option value="nothing">Nichts</option>
        </select>
      </div>
      <div>
        <div>
          <span>von</span>
          <input>
          <span>bis</span>
          <input>
        </div>
        <div>
          <span>Pause</span>
          <input>
        </div>
      </div>
      <div>
        <span>Dauer</span>
        <input>
      </div>
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