<template>
    <div class="page">
        <Navigation v-bind:items="navigation_items"/>
        <keep-alive>
            <component v-bind:is="current_navigation_item"></component>
        </keep-alive>
    </div>
</template>

<script>
    import Navigation from './navigation/Navigation.vue'
    import Home from './content/home/Home.vue'
    import Redis from './content/redis/Redis.vue'

    import {
        mapState
    } from 'vuex'

    export default {
        components: {
            Navigation,
            Home,
            Redis
        },
        computed:{
            ...mapState('AStore',[
                'current_navigation_item'
            ])
        },
        data() {
            return {
                navigation_items: this.$store.state.AStore.navigation_items
            };
        }
    }
</script>

<style lang="css" scoped>
@import './style.css';
</style>