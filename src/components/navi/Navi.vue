<template>
    <div class="navi">
        <ol class="navi-ol">
            <NaviItem v-for="item in navis" v-bind:item="item" v-bind:key="item.id"  v-bind:currentNavi="currentNavi"
                v-on:selected="$emit('change-navi', $event)"></NaviItem>
        </ol>
    </div>
</template>

<script>
    import NaviItem from './NaviItem.vue'

    export default {
        components: {
            NaviItem
        },
        props: {
            navis: {
                type: Array,
                required: true
            },
            currentNavi: {
                type: String,
                required: true
            }
        },
        data() {
            return {};
        }
    }
</script>

<style lang="css">
    @import './navi.css';
</style>