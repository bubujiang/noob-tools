<template>
    <div class="confirm">
        <div class="title">
            <span>{{title}}</span>
        </div>
        <div class="body">
            <span>{{content}}</span>
        </div>
        <div class="footer">
            <span><IButton v-bind:val="$t('cancel')" v-on:b-click="$emit('confirm-cancel')" color="#5D6E93" /></span>
            <span><IButton v-bind:val="$t('sure')" v-on:b-click="$emit('confirm-sure')" color="#031234" /></span>
        </div>
    </div>
</template>

<script>
import IButton from 'components/common/IButton.vue';
export default {
    components:{
        IButton
    },
    props:{
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }
    }
}
</script>

<style src="style/common/confirm-window.css" scoped></style>