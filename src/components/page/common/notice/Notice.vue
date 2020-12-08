<template>
    <div class="notice" v-if="notice.msg">
        <div class="msg-div"><span class="msg">{{notice.msg}}</span><img class="icon" :src="img" /></div>
        <div class="btn-div"><input type="button" class="btn" value="I know" v-on:click="cleanNotice"></div>
    </div>
</template>

<script>
import {
        mapState,mapMutations
    } from 'vuex'

export default {
    computed:{
            ...mapState('AStore',[
                'notice'
            ])
        },
        methods:{
            ...mapMutations('AStore',[
                'cleanNotice'
            ])
        },
        data(){
            return{
                img:require("assets/notice.png")
            }
        }
}
</script>

<style lang="css" scoped>
@import url('./../style.css');
@import url('./style.css');
</style>