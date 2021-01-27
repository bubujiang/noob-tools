<template>
    <div class="body">
        <Connections v-on:width-change="widthChange($event)" />
        <Client v-bind:width="width" />
    </div>
</template>

<script>
    import Connections from 'components/common/Connections.vue';
    import Client from 'components/redis/RedisClient.vue';
    
    export default {
        components: {
            Connections,
            Client
        },
        data(){
            return {
                width:'1|0'
            }
        },
        methods:{
            widthChange(width){
                this.width = width;
            }
        }
    }
</script>

<style src="style/redis/redis-body.css" scoped>

</style>