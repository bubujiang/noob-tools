<template>
    <div class="error" v-if="error.msg">
        <div class="msg-div"><span class="msg">{{error.msg}}</span><img class="icon" :src="img" /></div>
        <div class="btn-div"><input type="button" class="btn" value="I know" v-on:click="cleanError"></div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapState('AStore', [
                'error'
            ])
        },
        methods:{
            ...mapMutations('AStore',[
                'cleanError'
            ])
        },
        data(){
            return{
                img:require("assets/error.png")
            }
        }
    }
</script>

<style lang="css" scoped>
@import url('./../style.css');
    @import url('./style.css');
</style>