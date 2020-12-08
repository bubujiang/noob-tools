<template>
    <div class="navi">
        <ol class="navi-ol">
            <Item v-for="item in items" v-bind:item="item" v-bind:key="item.id"></Item>
        </ol>
    </div>
</template>

<script>
    import Item from './item/Item.vue'

    export default {
        components: {
            Item
        },
        props: {
            items: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>