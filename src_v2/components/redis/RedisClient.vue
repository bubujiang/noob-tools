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
        created(){
            //console.log('s c w',this.left);
            //const patter = /[0-9]+\|/;
            //this.left += Number(_.replace(this.width, /[0-9]+\|/, ''));
            //console.log('c w',this.width,this.left);
        },
        watch:{
            width(){
                //console.log('w w',this.width,this.left);
                console.log('s w w',this.left);
                //const patter = /[0-9]+\|/;
                //_.replace(width, patter, '');

                this.left += Number(_.replace(this.width, /[-0-9]+\|/, ''));
                console.log('w w',this.width,this.left);
            }
        }
    }
</script>

<style src="style/redis/redis-client.css" scoped></style>