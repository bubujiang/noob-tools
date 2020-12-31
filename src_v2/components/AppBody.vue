<template>
  <div class="body">
    <AppNavigation />
    <AppClient />
    <div class="abx">
      <transition-group name="message" tag="div" v-on:after-enter="hideMsg">
        <div v-for="(prompt,i) in list" v-bind:key="'p'+i" ref="pop" v-bind:css="false" class="popack" :data-index="i">
          <MessagePop v-bind:message="prompt" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";
  import AppNavigation from "components/AppNavigation.vue";
  import AppClient from "components/AppClient.vue";
  import MessagePop from "components/common/MessagePop.vue";
  import {
    mapState,
    mapMutations
  } from "vuex";

  export default {
    components: {
      AppNavigation,
      AppClient,
      MessagePop,
    },
    computed: {
      ...mapState("AStore", ["prompts"]),
    },
    data() {
      return {
        list: {},
      }
    },
    created() {
      this.initList();
    },
    watch: {
      prompts: function () {
        this.initList();
      }
    },
    methods: {
      ...mapMutations('AStore', ['showedPrompt']),

      hideMsg(el) {
        const i = _.trimStart(el.dataset.index, 'k');
        setTimeout(() => {
          this.showedPrompt(i);
        }, 3000);
      },

      initList() {
        let l = {};
        for (const i in this.prompts) {
          const prompt = this.prompts[i];
          if (!prompt.showed) {
            l['k' + i] = {
              ...prompt
            };
          }
        }
        this.list = {
          ...l
        };
      }
    }
  };
</script>

<style src="style/app-body.css" scoped>
</style>