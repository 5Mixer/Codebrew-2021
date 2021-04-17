<template>
  <div>

    <table>
      <tr>
        <td>
          <h1>Block based bot editor</h1>
        </td>
      </tr>
      <tr>
        <td id="blocklyArea">
        </td>
      </tr>
    </table>
    
    <div id="blocklyDiv" style="position: absolute"></div>
    <img alt="Vue logo" src="./assets/logo.png" />
    

    <HelloWorld msg="Hello Vue 3 + Vite" />

  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'

</script>
