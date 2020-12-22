<template>
    <div class="body">
            <div class="db">
                <ol class="dbol">
                    <li><span>DB</span><span>Keys</span><span>Expires</span><span>Avg TTL</span><span>OP</span></li>
                    <li v-for="(v,k) in info.info.Keyspace" v-bind:key="k"><span>{{k}}</span><span>{{v[0]}}</span><span>{{v[1]}}</span><span>{{v[2]}}</span><span><input type="button" value="open" /></span></li>
                </ol>
            </div>
            <div class="info">
                <ol class="inol">
                    <li v-for="(vs,tk) in info.info" v-bind:key="tk">
                        <ol class="part_ol" v-if="tk!=='Keyspace'">
                            <li><span class="part_title">{{tk}}</span></li>
                            <li v-for="(v,k) in vs" v-bind:key="k"><span class="part_v">{{k}}</span><span class="part_v">{{v}}</span></li>
                        </ol>
                    </li>
                    <!--<li><span>server key</span><span>value</span><span></span></li>
                    <li v-for="(v,k) in info.info" v-bind:key="k"><span>{{k}}</span><span>{{v}}</span><span></span></li>-->
                </ol>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'

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