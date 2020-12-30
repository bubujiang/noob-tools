<template>
    <div class="pop">
        <div class="title"><img :src="message.img" /></div>
        <div class="body"><span>{{message.info}}</span></div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    computed:{
        ...mapState('AStore',['prompt']),
        message(){
            const message = this.prompt[this.prompt.length - 1];
            let img = require('image/info.png');
            if(message.type === 'error'){
                img = require('image/error.png');
            }
            else if(message.type === 'success'){
                img = require('image/correct.png');
            }

            return {...message,img}
        }
    }
}
</script>

<style src="style/common/message-pop.css" scoped></style>