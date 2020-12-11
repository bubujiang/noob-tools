<template>
    <div class="header">
        <span class="min" v-on:click="min()"></span>
        <span class="max" v-on:click="max()"></span>
        <span class="close" v-on:click="close()"></span>
    </div>
</template>

<script>
    const ipcRenderer = window['require']('electron').ipcRenderer;
    export default {
        methods: {
            min() {
                ipcRenderer.send('min-app')
            },
            max() {
                ipcRenderer.send('toggle-app')
            },
            close() {
                ipcRenderer.send('close-app')
            }
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>