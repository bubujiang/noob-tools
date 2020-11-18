<template>
    <div class="header">
        <span class="min" v-on:click="min()">最小化</span>
        <span class="close" v-on:click="close()">关闭</span>
    </div>
</template>

<script>
    let ipcRenderer = window['require']('electron').ipcRenderer;
    export default {
        methods: {
            min() {
                ipcRenderer.send('min-app')
            },
            close() {
                ipcRenderer.send('close-app')
            }
        }
    }
</script>

<style lang="css">
    @import './style.css'
</style>