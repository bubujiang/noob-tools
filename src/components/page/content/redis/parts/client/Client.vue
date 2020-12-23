<template>
    <div class="client" v-show="Object.keys(server_tabs).length">
        <Header v-bind:tabs="server_tabs" v-bind:selected_tab="current_selected_tab" v-on:selected-tab="changeSelectedTab($event)" />

        <div  v-for="(server, key) in server_tabs" v-bind:key="key">
            <div>
                <InfoBody v-bind:server="server" v-bind:server_k="key" v-if="isShow(key)"></InfoBody>
            </div>
            <div v-for="(db, dkey) in server.db" v-bind:key="dkey">
                <DbBody v-bind:db="db" v-bind:db_k="dkey" v-bind:server_k="key" v-if="isShow(key+dkey)"></DbBody>
            </div>
        </div>
        
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import InfoBody from './body/Info.vue'
    import DbBody from './body/Db.vue'

    import Header from 'common/client/header/Header.vue';


    export default {
        components: {
            Header,
            InfoBody,
            DbBody
        },
        computed: {
            ...mapState('RStore', [
                'server_tabs',
                'current_selected_tab'
            ])
        },
        methods: {
            ...mapMutations('RStore', [
                'changeSelectedTab'
            ]),
            isShow(key){
                console.log('key',key,this.current_selected_tab);
                if(this.current_selected_tab.server === key && this.current_selected_tab.db === null){
                    return true;
                }else if(this.current_selected_tab.server + this.current_selected_tab.db === key){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>