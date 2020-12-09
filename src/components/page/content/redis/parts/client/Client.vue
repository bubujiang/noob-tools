<template>
    <div class="client" v-if="server_tabs">
        <Header v-bind:tabs="server_tabs" v-bind:selected_tab="current_server_tab" v-on:selected-tab="changeServerTab($event)" />
        <InfoBody v-bind:info="server_tabs['127.0.0.1:99']"/>
    </div>
</template>

<script>
import {
        mapState,
        mapMutations
    } from 'vuex'

    import InfoBody from './body/Info.vue'

import Header from 'common/client/header/Header.vue';


    export default {
        components:{
            Header,InfoBody
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