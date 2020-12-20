<template>
    <li class="server">
        <span class="server-name" v-on:click="selectServer">{{ menu.name }}</span>
        <span class="img-span" v-if="img"><img class="img" :src="img" /></span>
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
        data(){
            return {
                //img:require("assets/loading.gif")
                //img:require("assets/conned.png")
                img:''
            }
        },
        watch:{
            //img:function(){}
        },
        methods:{
            ...mapMutations('RStore',[
                'changeSelectedTab','setError','updateServerState'
            ]),
            selectServer(){
                //改变图标
                if(this.menu.state === 0 || this.menu.state === -1){
                    //未连接或者连接失败,变成正在连接
                    this.updateServerState({k:this.menu_k,s:1});
                    this.img = require("assets/loading.gif");
                    //this.menu.state = 
                }
                //存在就切换
                for(const k in this.server_tabs){
                    const server = this.server_tabs[k];
                    if(this.menu.host === server.host
                    && this.menu.port === server.port){
                        this.changeSelectedTab({server:server.host+':'+server.port,db:null});
                        return;
                    }
                }
                ////
                //发送切换连接的消息
                Message.send.renderer.redis_select_server.call(this,this.menu);
                //ipcRenderer.send('redis-make-thread',this.menu);
                //return;
                //rTsConn.call(this,ipcRenderer,this.menu,(sucess)=>{
                //    ipcRenderer.send('redis-render-select-server-menu',this.menu);
                //},(error)=>{
                //    this.setError({k:'conn',v:error});
                //});
            }
        }
    }
</script>

<style lang="css" scoped>
</style>