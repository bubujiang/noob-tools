<template>
    <div class="servers">
        <ol class="servers-ol">
            <Button v-on:add-server-window="addServerWindow()"/>
            <Server v-for="server in servers" v-bind:server="server" v-bind:key="server.id"></Server>
        </ol>
        <transition name="server-slide">
            <Prompt v-if="addServerWindowShow"  v-on:add-server-window-close="addServerWindowClose()" />
        </transition>
    </div>
</template>

<script>
    import Server from './Server.vue'
    import Button from './AddServerButton.vue'
    import Prompt from './AddServer.vue'

    export default {
        components: {
            Server,
            Button,
            Prompt
        },
        props: {
            servers: {
                type: Array,
                required: true
            }
        },
        data(){
            return{
                addServerWindowShow:false,
                inputServer:this.$store.state.SStore.addServer
            }
        },
        methods:{
            addServerWindow(){
                this.addServerWindowShow = true;
            },
            addServerWindowClose(){
                this.addServerWindowShow = false;
            },
            addServer(){
                
            }
        }
    }
</script>

<style lang="css">
    @import './style.css';
</style>