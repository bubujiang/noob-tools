<template>
    <div class="content redis">
        <Server />
        <Client />
    </div>
</template>

<script>
    import Server from './parts/server/Server.vue'
    import Client from './parts/client/Client.vue'
    import {mapMutations} from 'vuex'
    const ipcRenderer = window['require']('electron').ipcRenderer;

    export default {
        components: {
            Server,
            Client
        },
        methods:{
            ...mapMutations('RStore',[
                'changeSelectedTab'
            ])
        },
        created(){
            ipcRenderer.on('redis-change-selected-tab',(e,server,db)=>{
                this.changeSelectedTab({server,db});
            });
        }
    }
</script>

<style lang="css" src="./../style.css" scoped>
</style>
<style lang="css" src="./style.css" scoped>
</style>