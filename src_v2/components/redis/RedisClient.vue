<template>
    <div class="client" :style="'margin-left:'+left+'px'">
        <div class="header">
            <div class="item">
                <span>server 1</span>
            </div>
            <div class="item active">
                <span>server 2</span>
            </div>
            <div class="item">
                <span>server 3</span>
            </div>
        </div>
        <Info />
    </div>
</template>

<script>
    import Info from 'components/redis/RedisInfo.vue';
    import _ from 'lodash';

    export default {
        components: {
            Info
        },
        props:{
            width:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                left : 230
            }
        },
        watch:{
            width(){
                this.left += Number(_.replace(this.width, /[-0-9]+\|/, ''));
            }
        }
    }
</script>

<style src="style/redis/redis-client.css" scoped></style>