<template>
    <div class="pop">
        <div class="title"><img :src="img" /></div>
        <div class="body"><span>{{message.info}}</span></div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    props:{
        message:{
            type:Object,
            require:true
        }
    },
    computed:{
        ...mapState('AStore',['prompt']),
        img(){
            let img = require('image/info.png');
            if(this.message.type === 'error'){
                img = require('image/error.png');
            }
            else if(this.message.type === 'success'){
                img = require('image/correct.png');
            }
            return img;
        }
    }
}
</script>

<style src="style/common/message-pop.css" scoped></style>