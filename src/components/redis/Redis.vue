<template>
    <div class="content">
        <Servers v-bind:servers="servers" />
        <Client />
    </div>
</template>

<script>
    import Servers from './../servers/Servers.vue'
    import Client from './RedisClinet.vue'

    let id = 1;

    export default {
        components: {
            Servers,Client
        },
        data() {
            return {
                servers: [{
                    id: id++,
                    name: 'server1',
                    ip: '',
                    port: ''
                }, {
                    id: id++,
                    name: 'server2',
                    ip: '',
                    port: ''
                }]
            }
        }
    }
</script>

<style lang="css">
@import './style.css'
</style>