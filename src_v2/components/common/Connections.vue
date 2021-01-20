<template>
  <div class="connections" :style="'width:'+width+'px'">
    <div class="content">
      <div class="button" ref="button">
        <IButton val="add_connection" v-on:b-on="moveOn" color="#031234" />
      </div>
      <div class="new" v-show="show" v-on:mouseleave="moveOut" ref="new">
        <div style="height:37px;"></div>
        <div class="new-type">
          <div class="new-folder">
            <img :src="require('image/new_folder.png')" />
          </div>
          <div class="new-connect" v-on:click="addConnection">
            <img :src="require('image/new.png')" />
          </div>
        </div>
      </div>
      <div class="list" v-if="Object.keys(connections).length">
        <Connection v-for="(connection,i) in connections" v-bind:key="i" v-bind:index="i+''" v-bind:item="connection"
          top='1' />
      </div>
    </div>
    <span class="handle" @mousedown="mouseDown"><img :src="require('image/drag.png')" /></span>
  </div>
</template>

<script>
  import IButton from "components/common/IButton.vue";
  import Connection from "components/common/Connection.vue";
  import {
    mapMutations
  } from "vuex";

  import {
    mapState
  } from "vuex";

  export default {
    components: {
      IButton,
      Connection
    },
    props: {
      module: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        pre_x: 0,
        pre_w: 150,
        width: 150,
        show: false
      };
    },
    computed: {
      ...mapState("AStore", ["connections"]),
    },
    created() {
      document.addEventListener("mouseup", this.mouseUp);
    },
    destroyed() {
      document.removeEventListener("mouseup", this.mouseUp);
    },
    methods: {
      ...mapMutations("RStore", ["toggleAddConnectionPopupShow"]),
      addConnection() {
        if (this.module === 'redis') {
          this.toggleAddConnectionPopupShow();
        }
      },
      mouseDown(event) {
        document.addEventListener("mousemove", this.mouseMove);
        this.pre_x = event.x;
      },
      mouseMove(event) {
        this.width += event.x - this.pre_x;
        if (this.width <= 150) {
          this.width = this.pre_w;
          return;
        }
        this.pre_w = this.width;
        this.$emit("width-change", this.width + '|' + (event.x - this.pre_x));
        this.pre_x = event.x;
      },
      mouseUp() {
        document.removeEventListener("mousemove", this.mouseMove);
      },
      moveOn() {
        this.$refs.new.style.left = this.$refs.button.offsetLeft+'px';
        this.show = true;
      },
      moveOut() {
        this.show = false;
      }
    }
  }
</script>

<style src="style/common/connections.css" scoped></style>