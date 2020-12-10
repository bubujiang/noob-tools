<template>
    <div class="client" v-if="Object.keys(server_tabs).length">
        <Header v-bind:tabs="server_tabs" v-bind:selected_tab="current_server_tab" v-on:selected-tab="changeServerTab($event)" />
        
        <div v-for="(server, key) in server_tabs" v-bind:key="key">
            <InfoBody v-bind:info="server" v-if="isShow(key)"></InfoBody>
        </div>
            
        <div v-for="(db, dkey) in dbs" v-bind:key="dkey">
            <DbBody v-bind:db="db" v-if="isShow(dkey)"></DbBody>
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
                'current_server_tab'
            ])
        },
        data(){
            return {
                dbs:{},
            }
        },
        created: function () {
                for(const k in this.server_tabs) {
                    for(const dk in this.server_tabs[k].db){
                        this.dbs[k+dk] = this.server_tabs[k].db[dk];
                    }
                }
        },
        methods: {
            ...mapMutations('RStore', [
                'changeServerTab'
            ]),
            isShow(key){
                if(this.current_server_tab.server === key && this.current_server_tab.db === null){
                    return true;
                }else if(this.current_server_tab.server + this.current_server_tab.db === key){
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>