<template>
    <div class="add-server">
        <div class="add-server-title"><span class="add-server-title-txt">Edit Connect</span><span class="add-server-close" v-on:click="popupEditSwitch">×</span></div>
        <div class="add-server-content">
            <div class="add-server-host"><span class="add-server-host-txt">Host:</span><span class="add-server-host-input"><input class="add-server-host-input-input" type="text" v-model="edit_server_params.host" /></span></div>
            <div class="add-server-port"><span class="add-server-port-txt">Port:</span><span class="add-server-port-input"><input class="add-server-port-input-input" type="text" v-model="edit_server_params.port" /></span></div>
            <div class="add-server-auth"><span class="add-server-auth-txt">Auth:</span><span class="add-server-auth-input"><input class="add-server-auth-input-input" type="text" v-model="edit_server_params.auth" /></span></div>
            <div class="add-server-name"><span class="add-server-name-txt">Name:</span><span class="add-server-name-input"><input class="add-server-name-input-input" type="text" v-model="edit_server_params.name" /></span></div>
        </div>
        <div class="add-server-footer">
            <span class="add-server-footer-clear"><input class="add-server-footer-clear-button" type="button" v-on:click="resetEditServerParams" value="清空"/></span>
            <span class="add-server-footer-test"><input class="add-server-footer-test-button" type="button" v-on:click="testConn" value="测试"/></span>
            <span class="add-server-footer-add"><input class="add-server-footer-add-button" type="button" v-on:click="editConn" value="确认"/></span>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,mapState
    } from 'vuex'

    import {rTsConn} from 'pbm/redis.m.js'
    
    const ipcRenderer = window['require']('electron').ipcRenderer;

    export default {
        props:{
            menu_k:{
                type:Number,
                required:true
            }
        },
        computed:{
            ...mapState('RStore',[
                'edit_server_params',
                'server_menus'
            ])
        },
        methods: {
            ...mapMutations('RStore', [
                'popupEditSwitch',
                'resetEditServerParams',
                'editServer',
                'setError'
            ]),
            ...mapMutations('AStore', [
                'addNotice',
                'addError',
                'addSuccess'
            ]),
            testConn(){
                if(this.edit_server_params.host && this.edit_server_params.port){
                    rTsConn.call(this,ipcRenderer,edit_server_params,this.addSuccess,this.addError)
                }else{
                    this.addNotice('主机和端口必传');
                }
            },
            editConn(){
                if(!(this.edit_server_params.host && this.edit_server_params.port && this.edit_server_params.name)){
                    this.addNotice('主机、端口和名称必传');
                }else{
                    for(const k in this.server_menus){
                        const server_menu = this.server_menus[k];
                        if(this.edit_server_params.host === server_menu.host 
                        && this.edit_server_params.port === server_menu.port
                        && k != this.menu_k){
                            console.log('key',k, this.menu_k);
                            this.addNotice('服务已经存在!');
                            return;
                        }
                    }
                    this.editServer(this.menu_k);
                    this.setError({k:'conn',v:''});
                }
            }
        }
    }
</script>

<style lang="css" scoped>
</style>