<template>
    <div class="add" v-if="add_connection_popup_show" @keyup.esc="toggleAddConnectionPopupShow">
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

        <div class="gap">
            <span>SSL</span>
        </div>

        <div class="body-tsl">
            <div class="row">
                <div class="label">
                    <span>{{$t('PrivateKey')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.tsl.private_key" />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('PublicKey')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.tsl.public_key" />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('Authority')}}</span>
                </div>
                <div class="input">
                    <IInput v-model="add_connection_params.tsl.authority" />
                </div>
            </div>
        </div>

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
                    <IInput v-model="add_connection_params.ssh.private_key" />
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
            ICheckbox
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
        },
    };
</script>

<style src="style/redis/redis-connection-add.css" scoped></style>