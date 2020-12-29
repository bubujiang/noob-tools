<template>
    <div class="body">
        <Connections />
        <Client />
        <transition name="fade">
            <ConnectionAdd />
        </transition>
    </div>
</template>

<script>
    import Connections from 'components/redis/RedisConnections.vue';
    import Client from 'components/redis/RedisClient.vue';
    import ConnectionAdd from 'components/redis/RedisConnectionAdd.vue';

    export default {
        components: {
            Connections,
            Client,
            ConnectionAdd
        }
    }
</script>

<style src="style/redis/redis-body.css" scoped>

</style>