<template>
    <div class="client" v-if="server_tabs">
        <Header v-bind:tabs="server_tabs" v-bind:selected_tab="current_server_tab" v-on:selected-tab="changeServerTab($event)" />
        <div class="body">
            <div class="db">
                <ol class="dbol">
                    <li><span>DB</span><span>Keys</span><span>OP</span></li>
                    <li><span>db0</span><span>11</span><span><input type="button" value="open" /></span></li>
                    <li><span>db0</span><span>11</span><span><input type="button" value="open" /></span></li>
                </ol>
            </div>
            <div class="info">
                <ol class="inol">
                    <li><span>server key</span><span>value</span><span></span></li>
                    <li><span>db0</span><span>11</span><span></span></li>
                    <li><span>db0</span><span>11</span><span></span></li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
import {
        mapState,
        mapMutations
    } from 'vuex'

import Header from 'common/client/header/Header.vue';


    export default {
        components:{
            Header
        },
        computed:{
            ...mapState('RStore',[
                'server_tabs',
                'current_server_tab'
            ])
        },
        methods:{
            ...mapMutations('RStore',[
                'changeServerTab'
            ])
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>