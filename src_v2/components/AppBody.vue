<template>
  <div class="body">
    <AppNavigation />
    <AppClient />
    <!--<transition
      name="message"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >-->
    <transition name="message" v-on:after-enter="hideMsg">
      <MessagePop v-if="show_prompt" v-bind:css="false" />
    </transition>
  </div>
</template>

<script>
import AppNavigation from "components/AppNavigation.vue";
import AppClient from "components/AppClient.vue";
import MessagePop from "components/common/MessagePop.vue";
import { mapState,mapMutations } from "vuex";

export default {
  components: {
    AppNavigation,
    AppClient,
    MessagePop,
  },
  computed: {
    ...mapState("AStore", ["show_prompt"]),
  },
  methods:{
    ...mapMutations('AStore',['hidePrompt']),
    hideMsg(){
      setTimeout(()=>{
        this.hidePrompt();
      },3000);
    }
  }
};
</script>

<style src="style/app-body.css" scoped>
</style>