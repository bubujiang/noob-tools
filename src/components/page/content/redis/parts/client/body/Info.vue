<template>
    <div class="body">
            <div class="db">
                <ol class="dbol">
                    <li><span>DB</span><span>Keys</span><span>OP</span></li>
                    <li v-for="(v,k) in info.db" v-bind:key="k"><span>{{k}}</span><span>{{v.keys}}</span><span><input type="button" value="open" /></span></li>
                    <!--<li><span>db0</span><span>11</span><span><input type="button" value="open" /></span></li>-->
                </ol>
            </div>
            <div class="info">
                <ol class="inol">
                    <li><span>server key</span><span>value</span><span></span></li>
                    <li v-for="(v,k) in info.info" v-bind:key="k"><span>{{k}}</span><span>{{v}}</span><span></span></li>
                    <!--<li><span>db0</span><span>11</span><span></span></li>-->
                </ol>
            </div>
        </div>
</template>

<script>
import {mapState} from 'Vuex'

export default {
    props:{
        info:{
            type:Object,
            required:true
        }
    }
}
</script>

<style lang="css" src="./style.css" scoped>
</style>