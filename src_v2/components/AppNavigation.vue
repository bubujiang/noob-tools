<template>
    <div>
        <div v-if="show_navigation" class="navigation">
            <div :class="item.page === current_page ? 'item active' : 'item'" v-for="(item,i) in navigation" v-bind:key="i" v-on:click="changePage(item.page)">
                <span>{{item.name}}</span>
            </div>
        </div>
        <div class="toggle" :style="show_navigation ? '' : 'left:0'"><span v-on:click="toggleShowNavigation">{{show_navigation ? '&lt;&lt;' : '&gt;&gt;'}}</span></div>
    </div>
</template>

<script>
    import {
        mapState,mapMutations
    } from "vuex";

    export default {
        computed: {
            ...mapState("AStore", ["navigation", "current_page", "show_navigation"]),
        },
        methods: {
            ...mapMutations('AStore',['toggleShowNavigation','changePage']),
        },
    };
</script>

<style src="style/app-navigation.css" scoped></style>