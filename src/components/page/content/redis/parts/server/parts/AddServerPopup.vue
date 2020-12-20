<template>
    <div class="add-server">
        <div class="add-server-title"><span class="add-server-title-txt">Add New Connect</span><span class="add-server-close" v-on:click="popupSwitch">×</span></div>
        <div class="add-server-content">
            <div class="add-server-host"><span class="add-server-host-txt">Host:</span><span class="add-server-host-input"><input class="add-server-host-input-input" type="text" v-model="add_server_params.host" /></span></div>
            <div class="add-server-port"><span class="add-server-port-txt">Port:</span><span class="add-server-port-input"><input class="add-server-port-input-input" type="text" v-model="add_server_params.port" /></span></div>
            <div class="add-server-auth"><span class="add-server-auth-txt">Auth:</span><span class="add-server-auth-input"><input class="add-server-auth-input-input" type="text" v-model="add_server_params.auth" /></span></div>
            <div class="add-server-name"><span class="add-server-name-txt">Name:</span><span class="add-server-name-input"><input class="add-server-name-input-input" type="text" v-model="add_server_params.name" /></span></div>
        </div>
        <div class="add-server-footer">
            <span class="add-server-footer-clear"><input class="add-server-footer-clear-button" type="button" v-on:click="resetAddServerParams" value="清空"/></span>
            <span class="add-server-footer-test"><input class="add-server-footer-test-button" type="button" v-on:click="testConn" value="测试"/></span>
            <span class="add-server-footer-add"><input class="add-server-footer-add-button" type="button" v-on:click="addConn" value="添加"/></span>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,mapState
    } from 'vuex'

    //import {rTsConn} from 'pbm/redis.renderer.js'
    import {Message} from 'msg/renderer.process.msg.js'
    
    const ipcRenderer = window['require']('electron').ipcRenderer;

    export default {
        computed:{
            ...mapState('RStore',[
                'add_server_params',
                'server_menus'
            ])
        },
        methods: {
            ...mapMutations('RStore', [
                'popupSwitch',
                'resetAddServerParams',
                'addServer'
            ]),
            ...mapMutations('AStore', [
                'addNotice',
                'addError',
                'addSuccess'
            ]),
            testConn(){
                if(this.add_server_params.host && this.add_server_params.port){
                    Message.send.renderer.redis_test_server.call(this,this.add_server_params,this.addSuccess,this.addError);
                    //rTsConn.call(this,ipcRenderer,this.add_server_params,this.addSuccess,this.addError)
                }else{
                    this.addNotice('主机和端口必传');
                }
            },
            addConn(){
                if(!(this.add_server_params.host && this.add_server_params.port && this.add_server_params.name)){
                    this.addNotice('主机、端口和名称必传');
                }else{
                    for(const k in this.server_menus){
                        const server_menu = this.server_menus[k];
                        if(this.add_server_params.host === server_menu.host && this.add_server_params.port === server_menu.port){
                            this.addNotice('服务已经存在!');
                            return;
                        }
                    }
                    this.addServer();
                }
            }
        }
    }
</script>

<style lang="css" scoped>
</style>