<template>
    <div class="item" :style="top !== '1' ? 'padding-left: 20px;' :'' ">
        <div class="content">
            <div class="info">
                <span class="icon"><img :src="show_icon" v-if="show_icon" v-on:click="toggle" /></span>
            <span class="icon"><img :src="type_icon" /></span>
            <span class="name">{{item.name}}</span>
            </div>
            <div class="op">
                <span v-if="item.type==='folder'" class="icon"><img :src="require('image/new.png')" /></span>
            <span class="icon"><img :src="require('image/edit.png')" /></span>
            <span class="icon"><img :src="require('image/del.png')" /></span>
            </div>
        </div>
        <div class="child" v-if="item.type==='folder' && item.child.length && this.show_child">
            <Connection v-for="(child,i) in item.child" v-bind:key="i" v-bind:item="child" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Connection',
        props: {
            item: {
                type: Object,
                required: true,
            },
            top: { //顶层
                type: String,
                required: false
            }
        },
        data() {
            return {
                type_icon: '',
                //show_icon: '',
                show_child: false
            }
        },
        created() {
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
                }else if(this.item.type === 'folder'){
                    return require('image/show.png');
                }
                return '';
            }
        },
        methods:{
            toggle(){
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