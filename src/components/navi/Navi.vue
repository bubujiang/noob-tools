<template>
    <div class="navi">
        <ol class="navi-ol">
            <NaviItem v-for="item in navis" v-bind:item="item" v-bind:key="item.id"></NaviItem>
        </ol>
    </div>
</template>

<script>
    import NaviItem from './NaviItem.vue'

    let nextItemId = 1;

    export default {
        components: {
            NaviItem
        },
        data() {
            return {
                navis: [{
                    id: nextItemId++,
                    name: "欢迎页"
                },{
                    id: nextItemId++,
                    name: "mysql"
                }, {
                    id: nextItemId++,
                    name: "redis"
                }]
            };
        }
    }
</script>

<style lang="css">
@import './navi.css';
</style>