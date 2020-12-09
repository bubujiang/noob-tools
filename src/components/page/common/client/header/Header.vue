<template>
    <div class="header">
            <ol class="hol" v-for="(tab,key) in tabs"  v-bind:key="key">
                <li :class="isSelectedClass(key,null)" v-on:click="$emit('selected-tab',{server:key, db:null});">{{tab.name}}</li>
                <li v-for="(db,dbkey) in tab.db"  v-bind:key="dbkey" :class="isSelectedClass(key,dbkey)" v-on:click="$emit('selected-tab',{server:key, db:dbkey});">{{dbkey}}</li>
            </ol>
        </div>
</template>

<script>
export default {
    props:{
        tabs:{
            type:Object,
            required:true
        },
        selected_tab:{
            type:Object,
            required:true
        }
    },
    data(){
        return {}
    },
    methods:{
        isSelectedClass(key,dbkey){
            if(this.selected_tab.server === key && this.selected_tab.db === dbkey){
                return 'active';
            }
        }
    },
    computed:{
    }
}
</script>

<style lang="css" src="./style.css" scoped>
</style>