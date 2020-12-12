<template>
    <div class="servers">
        <ol class="servers-ol">
            <Button />
            <li><ol class="list">
                <Item v-for="menu in server_menus" v-bind:server="menu" v-bind:key="menu.id"></Item>
            </ol></li>
            <!--<Item v-for="menu in server_menus" v-bind:server="menu" v-bind:key="menu.id"></Item>-->
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
                'server_menus',
                'add_server_popup_show'
            ])
        }
    }
</script>

<style lang="css" scoped>
@import './style.css';
</style>