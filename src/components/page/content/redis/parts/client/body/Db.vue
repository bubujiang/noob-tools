<template>
  <div class="db">
    <!--<div class="shell"></div>-->
    <div class="left">
      <div class="list">
        <div class="keys">
          <ol class="keys_ol">
            <li
              v-for="(key, i) in keys"
              v-bind:key="i"
              v-on:click="selectKey(key)"
            >{{key}}</li>
          </ol>
        </div>
        <div class="btn"><input
            type="button"
            value="Add"
          /></div>
      </div>
    </div>
    <Right
    v-bind:redis_key="this.select_key"
      v-bind:type="activeValn.type"
      v-bind:ttl="activeValn.ttl"
      v-bind:val="activeValn.show_val"
      v-bind:format="activeValn.format"
      v-bind:db_key="this.db_k"
      v-bind:server_key="this.server_k"
      v-if="activeValn"
      v-on:vas="vas($event)"
    />

  </div>
</template>

<script>
import _ from "lodash";

import Right from "./DbRight.vue";

import { mapMutations } from "vuex";

import { Message } from "msg/renderer.process.msg.js";

export default {
  components: {
    Right,
  },
  props: {
    server_k: {
      type: String,
      required: true,
    },
    db_k: {
      type: String,
      required: true,
    },
    keys: {
      type: Array,
      required: true,
    },
    vals: {
      type: Object,
    },
  },
  data() {
    return {
      select_key: "",
      activeValn: null,
    };
  },
  watch: {
    vals: function () {
      for (const k in this.vals) {
        if (k === this.select_key) {
          this.activeValn = this.vals[k];
        }
      }
    },
  },
  methods: {
    ...mapMutations("RStore", ["keyViewAs"]),
    selectKey(key) {
      this.select_key = key;
      //发送消息给主进程获得key数据
      Message.send.renderer.redis_select_key.call(
        this,
        ..._.split(this.server_k, ":"),
        this.db_k,
        key
      );
    },
    async vas(e) {
      //console.log('rvfaergwet5',e.target.value);
      await this.keyViewAs({
        as: e.target.value,
        server_key: this.server_k,
        db_key: this.db_k,
        key: this.select_key,
      });
    },
  },
};
</script>

<style lang="css" src="./db.css" scoped>
</style>