<template>
    <li class="server">
        <span class="server-name" v-on:click="mkRedTh">{{ menu.name }}</span>
        <span class="img-span" v-if="img"><img class="img" :src="img" /></span>
        <AlertConnError v-if="error.conn" v-bind:menu_k="menu_k" v-bind:menu="menu" />
    </li>
</template>

<script>
    const ipcRenderer = window['require']('electron').ipcRenderer;

    import {mapState,mapMutations} from 'vuex'
    import {rTsConn} from 'pbm/redis.m.js'
    import AlertConnError from './AlertConnErrorOp.vue'

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
        methods:{
            ...mapMutations('RStore',[
                'changeSelectedTab','setError'
            ]),
            mkRedTh(){
                //存在就切换
                for(const k in this.server_tabs){
                    const server = this.server_tabs[k];
                    if(this.menu.host === server.host
                    && this.menu.port === server.port){
                        this.changeSelectedTab(this.server);
                        return;
                    }
                }
                ////
                ipcRenderer.send('redis-make-thread',this.menu);
                return;
                rTsConn.call(this,ipcRenderer,this.menu,(sucess)=>{
                    ipcRenderer.send('redis-make-thread',this.menu);
                },(error)=>{
                    this.setError({k:'conn',v:error});
                });
            }
        }
    }
</script>

<style lang="css" scoped>
</style>