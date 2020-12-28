<template>
    <div class="body">
        <Connections />
        <Client />
    </div>
</template>

<script>
import Connections from 'components/redis/RedisConnections.vue';
import Client from 'components/redis/RedisClient.vue';

export default {
    components:{
        Connections,Client
    }
}
</script>

<style src="style/redis/redis-body.css" scoped>

</style>