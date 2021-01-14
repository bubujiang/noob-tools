<template>
    <div class="add" v-show="add_connection_popup_show" @keyup.esc="toggleAddConnectionPopupShow">
        <!--<div class="title">
            <CircleButton color="red" size="15px" right="5px" radius="10px" v-on:cb-click="close()" />
        </div>-->
        <div class="body">
            <div class="row">
                <div class="label">
                    <span>{{$t('name')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.name" />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('host')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.host" />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('port')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.port" />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('auth')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.auth" />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('cluster')}}</span>
                </div>
                <div class="input">
                    <ICheckbox />
                </div>
            </div>

        </div>

        <div class="ext">
            <div class="ext-body">
                <div class="ext-tsl">
                    <span class="tsl-name">SSL</span>
                    <span class="tsl-check">
                        <ICheckbox v-on:change="selectExt('tsl',$event)" /></span>
                </div>
                <div class="ext-ssl">
                    <span class="ssh-name">SSH Tunnel</span>
                    <span class="tsl-check">
                        <ICheckbox v-on:change="selectExt('ssh',$event)" /></span>
                </div>
            </div>
        </div>

        <div v-for="(item,i) in ext_sort" v-bind:key="i">
            <div v-if="item.type === 'tsl' && item.selected">
                <div class="gap">
                    <span>SSL</span>
                </div>

                <div class="body-tsl">
                    <div class="row">
                        <div class="label">
                            <span>{{$t('PrivateKey')}}</span>
                        </div>
                        <div class="input">
                            <!--<IInput v-model="add_connection_params.tsl.private_key" />-->
                            <IInputFile />
                            <input type="file" ref="tsl_pvkey" v-show="0" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('PublicKey')}}</span>
                        </div>
                        <div class="input">
                            <!--<IInput v-model="add_connection_params.tsl.public_key" />-->
                            <IInputFile />
                            <input type="file" ref="tsl_pbkey" v-show="0" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('Authority')}}</span>
                        </div>
                        <div class="input">
                            <!--<IInput v-model="add_connection_params.tsl.authority" />-->
                            <IInputFile />
                            <input type="file" ref="tsl_auth" v-show="0" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="item.type === 'ssh' && item.selected">
                <div class="gap">
                    <span>SSH Tunnel</span>
                </div>

                <div class="body-ssh">
                    <div class="row">
                        <div class="label">
                            <span>{{$t('host')}}</span>
                        </div>
                        <div class="input">
                            <IInput v-model="add_connection_params.ssh.host" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('port')}}</span>
                        </div>
                        <div class="input">
                            <IInput v-model="add_connection_params.ssh.port" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('username')}}</span>
                        </div>
                        <div class="input">
                            <IInput v-model="add_connection_params.ssh.user" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('PrivateKey')}}</span>
                        </div>
                        <div class="input">
                            <!--<IInput v-model="add_connection_params.ssh.private_key" />-->
                            <IInputFile v-on:select="open('ssh_pvkey')" v-model="add_connection_params.ssh.private_key" />
                            <input type="file" ref="ssh_pvkey" v-show="0" v-on:change="select('ssh_pvkey')" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('passphrase')}}</span>
                        </div>
                        <div class="input">
                            <IInput v-model="add_connection_params.ssh.passphrase" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="label">
                            <span>{{$t('timeout')}}</span>
                        </div>
                        <div class="input">
                            <IInput v-model="add_connection_params.ssh.timeout" />
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="footer">
            <div class="reset">
                <IButton val="reset" v-on:b-click="toggleAddConnectionPopupShow" color="#5d6e93" />
            </div>
            <div class="test">
                <IButton val="test" v-on:b-click="testConnection" color="#031234" />
            </div>
            <div class="submit">
                <IButton val="submit" v-on:b-click="addNewConnectionPack" color="#031234" />
            </div>
        </div>
    </div>
</template>

<script>
    //import CircleButton from 'components/common/CircleButton.vue';
    import IButton from "components/common/IButton.vue";
    import IInput from "components/common/IInput.vue";
    import ICheckbox from "components/common/ICheckbox.vue";
    import IInputFile from "components/common/IInputFile.vue";

    import {
        mapState,
        mapMutations,
        mapActions
    } from "vuex";

    export default {
        components: {
            //CircleButton,
            IButton,
            IInput,
            ICheckbox,IInputFile
        },
        data() {
            return {
                ext_sort: []
            }
        },
        computed: {
            ...mapState("RStore", [
                "add_connection_popup_show",
                "add_connection_params",
            ]),
        },
        methods: {
            ...mapMutations("RStore", ["toggleAddConnectionPopupShow"]),
            ...mapActions("RStore", ["addNewConnection"]),
            ...mapActions("AStore", ["addNewPromp"]),
            async addNewConnectionPack() {
                await this.addNewConnection()
                    .then((suc_msg) => {
                        this.addNewPromp({
                            type: "success",
                            level: 0,
                            info: suc_msg,
                        });
                        //console.log(suc_msg);
                    })
                    .catch((err_msg) => {
                        this.addNewPromp({
                            type: "notice",
                            level: 0,
                            info: err_msg,
                        });
                        //console.log(err_msg);
                    });
            },
            testConnection() {
                const RendererMessage = require("ipcmsg/renderer.process.im.js");
                RendererMessage.send.main.redisTestConn(this.add_connection_params)
                    .then((result) => {
                        if (result.type === "success") {
                            this.addNewPromp({
                                type: "success",
                                level: 0,
                                info: result.msg,
                            });
                        } else {
                            this.addNewPromp({
                                type: "error",
                                level: 0,
                                info: result.msg,
                            });
                        }
                    })
                    .catch((error) => {
                        this.addNewPromp({
                            type: "error",
                            level: 0,
                            info: error,
                        });
                    });
            },
            selectExt(type, selected) {
                if (selected) {
                    this.ext_sort.unshift({
                        type,
                        selected
                    });
                } else {
                    for (const i in this.ext_sort) {
                        if (this.ext_sort[i].type === type) {
                            this.ext_sort.splice(i, 1);
                        }
                    }
                }
                this.ext_sort.splice(2, 1);
                this.ext_sort = [...this.ext_sort];
            },
            open(e){
                this.$refs[e][0].click()
            },
            select(e){
                this.$refs[e][0].value;
                //console.log(event,this.$refs[el][0],this.$refs[el][0].value);
            }
        },
    };
</script>

<style src="style/redis/redis-connection-add.css" scoped></style>