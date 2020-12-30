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

        </div>

        <div class="footer">
            <div class="reset">
                <IButton val="reset" v-on:b-click="toggleAddConnectionPopupShow" />
            </div>
            <div class="submit">
                <IButton val="submit" v-on:b-click="addNewConnectionPack" />
            </div>
        </div>
    </div>
</template>

<script>
    //import CircleButton from 'components/common/CircleButton.vue';
    import IButton from 'components/common/IButton.vue';
    import IInput from 'components/common/IInput.vue';

    import {
        mapState,mapMutations,mapActions
    } from 'vuex';

    export default {
        components: {
            //CircleButton,
            IButton,
            IInput
        },
        computed: {
            ...mapState('RStore', ['add_connection_popup_show', 'add_connection_params'])
        },
        methods: {
            ...mapMutations('RStore',['toggleAddConnectionPopupShow']),
            ...mapActions('RStore',['addNewConnection']),
            ...mapActions('AStore',['showNewPromp']),
            async addNewConnectionPack(){
                await this.addNewConnection().then((suc_msg)=>{
                    this.showNewPromp({
                        type:'success',
                        level:0,
                        info:suc_msg
                    });
                    console.log(suc_msg);
                }).catch((err_msg)=>{
                    this.showNewPromp({
                        type:'notice',
                        level:0,
                        info:err_msg
                    });
                    console.log(err_msg);
                });
            }
        }
    }
</script>

<style src="style/redis/redis-connection-add.css" scoped></style>