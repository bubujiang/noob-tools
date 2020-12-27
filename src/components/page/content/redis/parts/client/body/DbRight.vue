<template>
  <div class="right">
    <div class="top">
      <div class="op">
        <div class="type"><span>{{type}}</span></div>
        <div class="ttl"><span>ttl:{{ttl}}</span></div>
        <div class="vas"><select
            v-model="selected"
            @change="$emit('vas',$event);"
          >
            <option value="json">json</option>
            <option value="raw">raw</option>
            <option value="unserialize">unserialize</option>
          </select></div>
        <div class="reload"><button>reload</button></div>
        <div class="copy"><button>copy</button></div>
        <div class="del"><button>delete</button></div>
        <div class="save"><button v-on:click="save">save</button></div>
      </div>
    </div>
    <div class="view">
      <div
        contenteditable="true"
        class="textarea"
        v-html="content"
        @blur="content=$event.target.innerText"
      ></div>
    </div>
  </div>
</template>

<script>
import { Message } from "msg/renderer.process.msg.js";

export default {
  props: {
    server_key: {
      type: String,
      required: true,
    },
    db_key: {
      type: String,
      required: true,
    },redis_key: {
      type: String,
      required: true,
    },
    val: {
      type: String,
      required: true,
    },
    ttl: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: "",
      content: "",
    };
  },
  created() {
    //  console.log("format", this.format);
    this.selected = this.format;
    this.content = this.val;
  },
  watch: {
    format: function () {
      this.selected = this.format;
    },
    val: function () {
      console.log('val变化');
      this.content = this.val;
    },
  },
  methods: {
    save() {
      Message.send.renderer.redis_update_key.call(
        this,
        ..._.split(this.server_key, ":"),
        this.db_key,
        this.type,
        this.redis_key,
        this.content
      );
    },
    handleInput(e) {
      console.log(e.target.innerHTML, e.target.innerText);
      this.content = e.target.innerHTML;
    },
  },
};
</script>

<style lang="css" src="./db.css" scoped>
</style>