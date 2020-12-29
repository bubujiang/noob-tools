<template>
    <div class="add" v-if="add_connection_popup_show">
        <!--<div class="title">
            <CircleButton color="red" size="15px" right="5px" radius="10px" v-on:cb-click="close()" />
        </div>-->
        <div class="body">
            <div class="row">
                <div class="label">
                    <span>{{$t('name')}}</span>
                </div>
                <div class="input">
                    <IInput />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('host')}}</span>
                </div>
                <div class="input">
                    <IInput />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('port')}}</span>
                </div>
                <div class="input">
                    <IInput />
                </div>
            </div>

            <div class="row">
                <div class="label">
                    <span>{{$t('auth')}}</span>
                </div>
                <div class="input">
                    <IInput />
                </div>
            </div>

        </div>

        <div class="footer">
            <div class="reset">
                <IButton val="reset" v-on:b-click="close" />
            </div>
            <div class="submit">
                <IButton val="submit" v-on:b-click="close" />
            </div>
        </div>
    </div>
</template>

<script>
    //import CircleButton from 'components/common/CircleButton.vue';
    import IButton from 'components/common/IButton.vue';
    import IInput from 'components/common/IInput.vue';

    import {
        mapState
    } from 'vuex';

    export default {
        components: {
            //CircleButton,
            IButton,IInput
        },
        computed: {
            ...mapState('RStore', ['add_connection_popup_show'])
        },
        methods: {
            close() {}
        }
    }
</script>

<style src="style/redis/redis-connection-add.css" scoped></style>