<template>
    <div class="success" v-if="success.msg">
        <div class="msg-div"><span class="msg">{{success.msg}}</span><img class="icon" :src="img" /></div>
        <div class="btn-div"><input type="button" class="btn" value="I know" v-on:click="cleanSuccess"></div>
    </div>
</template>

<script>
import {
        mapState,mapMutations
    } from 'vuex'

export default {
    computed:{
            ...mapState('AStore',[
                'success'
            ])
        },
        methods:{
            ...mapMutations('AStore',[
                'cleanSuccess'
            ])
        },
        data(){
            return{
                img:require("assets/success.png")
            }
        }
}
</script>

<style lang="css" src="./../style.css" scoped>
</style>
<style lang="css" src="./style.css" scoped>
</style>