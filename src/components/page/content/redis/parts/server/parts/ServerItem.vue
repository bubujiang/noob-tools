<template>
    <li class="server">
        <span class="server-name" v-on:click="mkRedTh">{{ server.name }}</span>
        <span class="img-span" v-if="img"><img class="img" :src="img" /></span>
    </li>
</template>

<script>
    const ipcRenderer = window['require']('electron').ipcRenderer;

    export default {
        props: {
            server: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                //img:require("assets/loading.gif")
                img:require("assets/conned.png")
                //img:''
            }
        },
        methods:{
            mkRedTh(e){
                ipcRenderer.send('mkredth',this.server);
            }
        }
    }
</script>

<style lang="css" scoped>
</style>