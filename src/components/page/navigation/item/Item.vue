<template>
    <li v-bind:class="current_navigation_item==item.component ? 'navi-item activity' : 'navi-item' "
        v-on:click="select">
        <span class="navi-title">{{ item.name }}</span>
    </li>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        computed:{
            ...mapState('AStore',[
                'current_navigation_item'
            ])
        },
        methods: {
            select(){
                this.$store.commit('AStore/changeCurrentItem',this.item.component)
            }
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>