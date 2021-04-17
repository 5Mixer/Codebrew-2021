<template>
  <div id="app">    
    
    <BlocklyComponent id="blockly" :options="options" ref="foo"></BlocklyComponent>
    <HeaderComponent></HeaderComponent>
    
    <p id="code">
      <button v-on:click="showCode()">Show JavaScript</button>
      <pre v-html="code"></pre>
    </p>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import BlocklyComponent from './components/BlocklyComponent.vue'
import './blocks/on_message';
import './blocks/on_react';
import './blocks/add_react';
import './blocks/send_message';
import './blocks/reacter_field';
import './blocks/author_field';
import './blocks/channel_field';
import './blocks/content_field';
import './blocks/emoji_field';
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
    BlocklyComponent,
    HeaderComponent
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
body {
  height: 100vh;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20%;
  height: 95%;
  margin: 0;
  background-color: beige;
}
#blockly {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80%;
  height: 95%;
}
input {
  padding: 0.5rem;
  border-radius: 0.2rem;
  border: 0.1rem #a4a4a4 solid;
  font-size: 1rem;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
</style>
