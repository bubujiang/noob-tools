<template>
    <div class="body">
        <Connections v-on:width-change="widthChange($event)" />
        <Client v-bind:width="width" />
        <transition name="fade">
            <ConnectionAdd />
        </transition>
    </div>
</template>

<script>
    //import Connections from 'components/redis/RedisConnections.vue';
    import Connections from 'components/common/Connections.vue';
    import Client from 'components/redis/RedisClient.vue';
    import ConnectionAdd from 'components/redis/RedisConnectionAdd.vue';
    

    export default {
        components: {
            Connections,
            Client,
            ConnectionAdd
        },
        data(){
            return {
                width:'1|0'
            }
        },
        methods:{
            widthChange(width){
                //const patter = /[0-9]+\|/;
                //_.replace(width, patter, '');
                //this.$set(this.width,'len',width)
                this.width = width;
                console.log('e',width);
            }
        }
    }
</script>

<style src="style/redis/redis-body.css" scoped>

</style>