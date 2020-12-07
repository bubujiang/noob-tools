<template>
    <div class="content redis">
        <Server />
        <Client />
        <Warning />
        <Alert />
    </div>
</template>

<script>
    import Server from './parts/server/Server.vue'
    import Client from './parts/client/Client.vue'
    import Alert from 'common/alert/Alert.vue'
    import Warning from 'common/warning/Warning.vue'

    export default {
        components: {
            Server,
            Client,
            Alert,
            Warning
        }
    }
</script>

<style lang="css" scoped>
    @import './../style.css';
    @import './style.css';
</style>