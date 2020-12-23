<template>
    <div class="body">
        <div class="db">
            <ol class="dbol">
                <li><span>DB</span><span>Keys</span><span>Expires</span><span>Avg TTL</span><span>OP</span></li>
                <li v-for="(v,k) in server.info.Keyspace" v-bind:key="k">
                    <span>{{k}}</span>
                    <span>{{v[0]}}</span>
                    <span>{{v[1]}}</span>
                    <span>{{v[2]}}</span>
                    <span><input type="button" value="open" v-on:click="openDB(k)" /></span>
                </li>
            </ol>
        </div>
        <div class="info">
            <ol class="inol">
                <li v-for="(vs,tk) in server.info" v-bind:key="tk">
                    <ol class="part_ol" v-if="tk!=='Keyspace'">
                        <li><span class="part_title">{{tk}}</span></li>
                        <li v-for="(v,k) in vs" v-bind:key="k">
                            <span class="part_v">{{k}}</span>
                            <span class="part_v">{{v}}</span>
                        </li>
                    </ol>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    import _ from 'lodash'

    import {Message} from 'msg/renderer.process.msg.js'

    export default {
        props: {
            server_k:{type :String,required:true},
            server: {
                type: Object,
                required: true
            }
        },
        methods:{
            ...mapMutations('RStore',[
                'changeSelectedTab'
            ]),
            openDB(db){
                //如果存在就打开(修改current_selected_tab)
                if(_.hasIn(this.server,'db.'+db)){
                    //修改current_selected_tab
                    this.changeSelectedTab({server:this.server_k,db});
                }
                //发送消息给主进程处理获得keys
                Message.send.renderer.redis_open_db.call(this,..._.split(this.server_k,':'),db);
            }
        }
    }
</script>

<style lang="css" src="./style.css" scoped>
</style>