<template>
    <li class="add-server-button">
        <button class="add-server-button-button" v-on:click="popupSwitch">
            Add New Server
        </button>
    </li>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'

    export default {
        methods: {
            ...mapMutations('RStore', [
                'popupSwitch'
            ])
        }
    }
</script>

<style lang="css" scoped>
</style>