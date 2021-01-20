<template>
    <div class="widow">
        <div class="content">
            <div class="name"><span>{{$t('folder')}}:</span></div>
            <div class="input"><span><IInput v-model="folder" /></span></div>
        </div>
        <div class="op">
            <div class="cancel"><IButton val="cancel" v-on:b-click="$emit('close')" color="#5d6e93" /></div>
            <div class="submit"><IButton val="submit" v-on:b-click="$emit('create',folder)" color="#031234" /></div>
        </div>
    </div>
</template>

<script>
import IInput from "components/common/IInput.vue";
import IButton from "components/common/IButton.vue";

export default {
    components:{
        IInput,
        IButton
    },
    data(){
        return {
            folder:''
        }
    }
}
</script>

<style src="style/common/add-connection-folder.css" scoped></style>