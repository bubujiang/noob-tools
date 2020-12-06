<template>
    <li class="server">
        <span class="server-name" v-on:click="mkRedTh">{{ server.name }}</span>
        <select class="server-db">
            <Db v-for="(db,i) in server.db" v-bind:db="db" v-bind:key="i" />
        </select>
    </li>
</template>

<script>
    import Db from './ServerItemDb.vue'
    const ipcRenderer = window['require']('electron').ipcRenderer;

    export default {
        components: {
            Db
        },
        props: {
            server: {
                type: Object,
                required: true
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