<template>
    <li class="add-server-button">
        <button class="add-server-button-button" v-on:click="$emit('add-server-window')">
            Add New Server
        </button>
    </li>
</template>

<script>
    export default {
        methods:{
            addServer(){
                //localStorage 
            }
        }
    }
</script>

<style lang="css">
</style>