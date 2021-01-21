<template>
    <div class="item" :style="top !== '1' ? 'padding-left: 20px;' :'' ">
        <div class="content">
            <div class="info">
                <span class="icon"><img :src="show_icon" v-if="show_icon" v-on:click="toggleShowChild" /></span>
                <span class="icon"><img :src="type_icon" /></span>
                <span class="name">{{item.name}}</span>
            </div>
            <div class="op">
                <span v-if="item.type==='folder'" class="icon"><img :src="require('image/new_folder.png')" v-on:click="$emit('c-folder',index)" /></span>
                <span v-if="item.type==='folder'" class="icon"><img :src="require('image/new.png')" v-on:click="$emit('c-connect',index)"/></span>
                <span class="icon"><img :src="require('image/edit.png')" /></span>
                <span class="icon"><img :src="require('image/del.png')" v-on:click="delConnectionPack" /></span>
            </div>
        </div>
        <div class="child" v-if="item.type==='folder' && item.child.length && this.show_child">
            <Connection v-for="(child,i) in item.child" v-bind:key="i" v-bind:index="index+'|'+i" v-bind:item="child" v-on:c-folder="$emit('c-folder',$event)" v-on:c-connect="$emit('c-connect',$event)" />
        </div>
        <ConfirmWindow v-if="show_confirm" title="$$删除连接" :content="'$$确认删除\''+item.name+'\'吗?'"
            v-on:confirm-cancel="confirmDelCancel" v-on:confirm-sure="confirmDelSure" />
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex';
    import ConfirmWindow from 'components/common/ConfirmWindow.vue';

    export default {
        name: 'Connection',
        components: {
            ConfirmWindow
        },
        props: {
            item: {
                type: Object,
                required: true,
            },
            top: { //顶层
                type: String,
                required: false
            },
            index: { //路径
                type: String,
                required: true
            }
        },
        data() {
            return {
                type_icon: '',
                show_child: false,
                show_confirm: false
            }
        },
        created() {
            //console.log('index', this.index);
            if (this.item.type === 'mysql') {
                this.type_icon = require('image/mysql.png');
            } else if (this.item.type === 'redis') {
                this.type_icon = require('image/redis.png');
            } else {
                this.type_icon = require('image/folder.png');
            }
        },
        computed: {
            show_icon() {
                if (this.item.type === 'folder' && this.show_child === true) {
                    return require('image/hide.png');
                } else if (this.item.type === 'folder') {
                    return require('image/show.png');
                }
                return '';
            }
        },
        methods: {
            ...mapMutations('AStore', ['delConnection']),
            delConnectionPack() {
                this.show_confirm = true;
                //this.delConnection(this.index);
            },
            confirmDelCancel() {
                this.show_confirm = false;
            },
            confirmDelSure() {
                this.delConnection(this.index);
                this.show_confirm = false;
            },
            toggleShowChild() {
                this.show_child = !this.show_child;
            }
        },
        watch: {
            /*item() {
                if (this.item.type === 'folder' && this.item.show === true) {
                    this.show_icon = require('image/hide.png');
                } else if (this.item.type === 'folder') {
                    this.show_icon = require('image/show.png');
                } else {
                    this.show_icon = '';
                }
            }*/
        }
    };
</script>

<style src="style/common/connection.css" scoped></style>