<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
  
    <BlocklyComponent id="blockly" :options="options" ref="foo"></BlocklyComponent>
    <p id="code">
      <button v-on:click="showCode()">Show JavaScript</button>
      <pre v-html="code"></pre>
    </p>
  </div>
</template>

<script>

import BlocklyComponent from './components/BlocklyComponent.vue'
import './blocks/on_message';
import './blocks/send_message';
import './blocks/author_field';
import './blocks/channel_field';
import './prompt';
import {toolbox} from './blockly/toolbox';

import BlocklyJS from 'blockly/javascript';

async function postData(url = '', data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

export default {
  name: 'app',
  components: {
    BlocklyComponent
  },
  data(){
    return {
      code: '',
      options: {
        media: 'media/',
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        toolbox: toolbox
      }
    }
  },
  methods: {
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs["foo"].workspace);

      postData('http://localhost:5005/api/createBot', {
        js: encodeURI(this.code)
      }).catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  margin: 0;
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20%;
  height: 100%;
  margin: 0;
  background-color: beige;
}
#blockly {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80%;
  height: 100%;
}
</style>
