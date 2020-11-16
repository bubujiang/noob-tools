<template>
  <li>
    {{ todo.text }}
    <button @click="$emit('remove', todo.id)">
      X
    </button>
    <button @click="clickButton">
      Xxxxx
    </button>
  </li>
</template>

<script>
  export default {
    props: {
     todo: {
       type: Object,
       required: true
     }
   },
    methods:{
      clickButton(){
        let BrowserWindow = window['require']('electron').remote.BrowserWindow;
        let win = new BrowserWindow({ width: 800, height: 600 })
        win.loadURL('https://qq.com')
      }
    }
  }
</script>