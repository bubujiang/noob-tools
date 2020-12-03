<template>
    <div class="servers">
        <ol class="servers-ol">
            <Button />
            <Item v-for="server in servers" v-bind:server="server" v-bind:key="server.id"></Item>
        </ol>
        <transition name="server-slide">
            <Popup v-if="add_server_popup_show" />
        </transition>
    </div>
</template>

<script>
    import Item from './parts/ServerItem.vue'
    import Button from './parts/AddServerButton.vue'
    import Popup from './parts/AddServerPopup.vue'

    import {
        mapState
    } from 'vuex'

    export default {
        components: {
            Item,
            Button,
            Popup
        },
        computed:{
            ...mapState('RStore',[
                'servers',
                'add_server_popup_show'
            ])
        }
    }
</script>

<style lang="css">
    @import './style.css';
</style>