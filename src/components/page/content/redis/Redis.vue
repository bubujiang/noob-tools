<template>
    <div class="content redis">
        <Server />
        <Client />
    </div>
</template>

<script>
    import Server from './parts/server/Server.vue'
    import Client from './parts/client/Client.vue'

    export default {
        components: {
            Server,
            Client
        }
    }
</script>

<style lang="css" scoped>
    @import './../style.css';
    @import './style.css';
</style>