<template>
    <div class="item" :style="top !== '1' ? 'left: 10px;' :'' ">
        <div class="content">
            <span class="icon"><img :src="require('image/folder.png')" /></span>
            <span class="name">{{item.name}}</span>
        </div>
        <div class="child" v-if="item.type==='folder' && item.child.length">
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
            top:{
                type:String,
                required:false
            }
        }
    };
</script>

<style src="style/common/connection.css" scoped></style>