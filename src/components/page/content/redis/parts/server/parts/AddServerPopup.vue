<template>
    <div class="add-server">
        <div class="add-server-title"><span class="add-server-title-txt">Add New Connect</span><span class="add-server-close" v-on:click="popupSwitch">×</span></div>
        <div class="add-server-content">
            <div class="add-server-host"><span class="add-server-host-txt">Host:</span><span class="add-server-host-input"><input class="add-server-host-input-input" type="text" /></span></div>
            <div class="add-server-port"><span class="add-server-port-txt">Port:</span><span class="add-server-port-input"><input class="add-server-port-input-input" type="text" /></span></div>
            <div class="add-server-auth"><span class="add-server-auth-txt">Auth:</span><span class="add-server-auth-input"><input class="add-server-auth-input-input" type="text" /></span></div>
            <div class="add-server-name"><span class="add-server-name-txt">Name:</span><span class="add-server-name-input"><input class="add-server-name-input-input" type="text" /></span></div>
        </div>
        <div class="add-server-footer">
            <span class="add-server-footer-clear"><input class="add-server-footer-clear-button" type="button" value="清空"/></span>
            <span class="add-server-footer-test"><input class="add-server-footer-test-button" type="button" value="测试"/></span>
            <span class="add-server-footer-add"><input class="add-server-footer-add-button" type="button" value="添加"/></span>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'

    export default {
        methods: {
            ...mapMutations('RStore', [
                'popupSwitch'
            ]),
            addServer(){
                
            }
        }
    }
</script>

<style lang="css" scoped>
</style>