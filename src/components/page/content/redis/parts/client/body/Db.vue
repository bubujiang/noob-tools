<template>
    <div class="db">
        <!--<div class="shell"></div>-->
        <div class="left">
            <div class="list">
                <div class="keys">
                    <ol class="keys_ol">
                        <li v-for="(key, i) in db.keys" v-bind:key="i" v-on:click="selectKey(key)">{{key}}</li>
                    </ol>
                </div>
                <div class="btn"><input type="button" value="Add" /></div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <!--<div class="attr">
                    <div class="type"><span>string</span></div>
                    <div class="ttl"><span>ttl:99</span></div>
                </div>-->
                <div class="op">
                    <div class="type"><span>string</span></div>
                    <div class="ttl"><span>ttl:99</span></div>
                    <div class="vas"><select>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                        </select></div>
                    <div class="reload"><button>reload</button></div>
                    <div class="copy"><button>copy</button></div>
                    <div class="del"><button>delete</button></div>
                    <div class="save"><button>save</button></div>
                </div>
            </div>
            <div class="view">
                araerggggggggaergaergardvraergegaegagasvaer4gaevaerhaerarvraerjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

import {Message} from 'msg/renderer.process.msg.js'

    export default {
        props:{
            server_k:{
                type:String,
                required:true
            },
            db_k:{
                type:String,
                required:true
            },
            db:{
                type:Object,
                required:true
            }
        },
        methods:{
            selectKey(key){
                //发送消息给主进程处理获得keys
                Message.send.renderer.redis_select_key.call(this,..._.split(this.server_k,':'),db_k,key);
            }
        }
    }
</script>

<style lang="css" src="./db.css" scoped>

</style>