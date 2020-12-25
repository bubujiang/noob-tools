<template>
    <div class="db">
        <!--<div class="shell"></div>-->
        <div class="left">
            <div class="list">
                <div class="keys">
                    <ol class="keys_ol">
                        <li v-for="(key, i) in keys" v-bind:key="i" v-on:click="selectKey(key)">{{key}}</li>
                    </ol>
                </div>
                <div class="btn"><input type="button" value="Add" /></div>
            </div>
        </div>
        <!--<div class="right" v-for="(v, k) in vals" v-bind:key="k">
            <div class="top">
                <div class="op">
                    <div class="type"><span>{{v.type}}</span></div>
                    <div class="ttl"><span>ttl:{{v.ttl}}</span></div>
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
            <div class="view">{{v.val}}</div>
        </div>-->

        <div class="right" v-if="activeVal">
            <div class="top">
                <div class="op">
                    <div class="type"><span>{{activeVal.type}}</span></div>
                    <div class="ttl"><span>ttl:{{activeVal.ttl}}</span></div>
                    <div class="vas"><select @change="vas($event)">
                            <option value="json">json</option>
                            <option value="raw">raw</option>
                            <option value="unserialize">unserialize</option>
                        </select></div>
                    <div class="reload"><button>reload</button></div>
                    <div class="copy"><button>copy</button></div>
                    <div class="del"><button>delete</button></div>
                    <div class="save"><button>save</button></div>
                </div>
            </div>
            <div class="view">{{activeVal.show_val}}</div>
        </div>

    </div>
</template>

<script>
    import _ from "lodash";

    import {
        mapMutations
    } from "vuex";

    import {
        Message
    } from "msg/renderer.process.msg.js";

    export default {
        props: {
            server_k: {
                type: String,
                required: true,
            },
            db_k: {
                type: String,
                required: true,
            },
            keys: {
                type: Array,
                required: true,
            },
            vals: {
                type: Object,
            },
        },
        data() {
            return {
                select_key: ''
            }
        },
        computed: {
            activeVal: function () {
                console.log('sefawegaergaethshsrhj6e56je56k');
                for (const k in this.vals) {
                    if (k === this.select_key) {
                        return this.vals[k];
                    }
                }
                return null;
            }
        },
        methods: {
            ...mapMutations('RStore', [
                'keyViewAs'
            ]),
            selectKey(key) {
                //发送消息给主进程获得key数据
                Message.send.renderer.redis_select_key.call(
                    this,
                    ..._.split(this.server_k, ":"),
                    this.db_k,
                    key
                );
                //
                this.select_key = key;
            },
            async vas(e) {
                //console.log('rvfaergwet5',as,as.target.value);
                await this.keyViewAs({
                    as: e.target.value,
                    server_key:this.server_k,
                    db_key:this.db_k,
                    key: this.select_key
                });
            }
        },
    };
</script>

<style lang="css" src="./db.css" scoped>
</style>