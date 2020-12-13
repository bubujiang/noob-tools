<template>
    <div class="error" v-if="msg">
        <div class="msg-div"><span class="msg">{{msg}}</span><img class="icon" :src="img" /></div>
        <div class="btn-div"><input type="button" class="btn" value="Delete" v-on:click="del"></div>
        <div class="btn-div"><input type="button" class="btn" value="Edite" v-on:click="edit"></div>
        <div class="btn-div"><input type="button" class="btn" value="Cancel" v-on:click="cancel"></div>
        <EditPopup v-if="edit_server_popup_show" v-bind:menu_k="menu_k" />
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import EditPopup from './EditServerPopup.vue'
    
    export default {
        components:{
            EditPopup
        },
        props:{
            menu_k:{
                type:Number,
                required:true
            },
            menu:{
                type:Object,
                required:true
            }
        },
        computed: {
            ...mapState('RStore', {
                msg:state => state.error.conn,
                edit_server_popup_show:state=>state.edit_server_popup_show
            })
        },
        methods:{
            ...mapMutations('RStore',[
                'setError',
                'delMenuByK',
                'initEditPopup',
                'popupEditSwitch'
                
            ]),
            cancel(){
                this.setError({k:'conn',v:''});
            },
            del(){
                this.setError({k:'conn',v:''});
                this.delMenuByK(this.menu_k);

            },
            edit(){
                this.initEditPopup(this.menu);
                this.popupEditSwitch();
            }
        },
        data(){
            return{
                img:require("assets/error.png")
            }
        }
    }
</script>

<style lang="css" src="./alert.css" scoped>
</style>