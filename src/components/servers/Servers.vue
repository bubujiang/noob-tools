<template>
    <div class="servers">
        <ol class="servers-ol">
            <Button />
            <Server v-for="server in servers" v-bind:server="server" v-bind:key="server.id"></Server>
        </ol>
        <Prompt />
    </div>
</template>

<script>
import Server from './Server.vue'
import Button from './AddServerButton.vue'
import Prompt from './AddServer.vue'
    
    export default {
        components: {
            Server,Button,Prompt
        },
        props: {
            servers: {
                type: Array,
                required: true
            }
        },
    }
</script>

<style lang="css">
@import './style.css';
</style>