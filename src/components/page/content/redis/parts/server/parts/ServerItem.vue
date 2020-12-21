<template>
    <li class="server">
        <span class="server-name" v-on:click="selectServer">{{ menu.name }}</span>
        <span class="img-span" v-if="menu.img"><img class="img" :src="menu.img" /></span>
        <AlertConnError v-if="error.conn" v-bind:menu_k="menu_k" v-bind:menu="menu" />
    </li>
</template>

<script>
    const ipcRenderer = window['require']('electron').ipcRenderer;

    import {mapState,mapMutations} from 'vuex'
    //import {rTsConn} from 'pbm/redis.renderer.js'
    import AlertConnError from './AlertConnErrorOp.vue'
    import {Message} from 'msg/renderer.process.msg.js'

    export default {
        props: {
            menu_k:{
                type:Number,
                required:true
            },
            menu: {
                type: Object,
                required: true
            }
        },
        components:{
            AlertConnError
        },
        computed:{
            ...mapState('RStore',[
                'server_tabs','error'
            ])
        },
        methods:{
            ...mapMutations('RStore',[
                'changeSelectedTab','setError','updateServerState'
            ]),
            selectServer(){
                //改变图标
                this.updateServerState({k:this.menu_k,s:1});
                //存在就切换
                for(const k in this.server_tabs){
                    const server = this.server_tabs[k];
                    const key = this.menu.host+':'+this.menu.port;
                    //console.log('argaergwe5hwhwrthrtth',k,this.menu);
                    if(k === key){
                        //console.log('argaergwe5hwhwrthrtth');
                        this.changeSelectedTab({server:key,db:null});
                        break;
                    }
                }
                ////
                //发送切换连接的消息
                Message.send.renderer.redis_select_server.call(this,this.menu);
            }
        }
    }
</script>

<style lang="css" scoped>
</style>