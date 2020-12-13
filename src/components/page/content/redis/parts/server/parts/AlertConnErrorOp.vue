<template>
    <div class="error" v-if="msg">
        <div class="msg-div"><span class="msg">{{msg}}</span><img class="icon" :src="img" /></div>
        <div class="btn-div"><input type="button" class="btn" value="Delete" v-on:click="del"></div>
        <div class="btn-div"><input type="button" class="btn" value="Edite" v-on:click="edit"></div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    
    export default {
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
                msg:state => state.error.conn
            })
        },
        methods:{
            ...mapMutations('RStore',[
                'setError',
                'delMenuByK'
            ]),
            del(){
                this.setError({k:'conn',v:''});
                this.delMenuByK(this.menu_k);

            },
            edit(){

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