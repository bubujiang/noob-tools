<template>
  <div class="connections" :style="'width:'+width+'px'">
    <div class="content">
      <div class="button">
        <IButton val="add_connection" v-on:b-click="()=>{}" color="#031234" />
      </div>
      <div class="list" v-if="Object.keys(connections).length">
        <Connection v-for="(connection,i) in connections" v-bind:key="i" v-bind:index="i+''" v-bind:item="connection" top='1' />
      </div>
    </div>
    <span class="handle" @mousedown="mouseDown"><img :src="require('image/drag.png')" /></span>
  </div>
</template>

<script>
  import IButton from "components/common/IButton.vue";
  import Connection from "components/common/Connection.vue";
  import {
    mapState
  } from "vuex";

  export default {
    components: {
      IButton,
      Connection
    },
    data() {
      return {
        pre_x: 0,
        pre_w: 150,
        width: 150
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
      mouseDown(event) {
        document.addEventListener("mousemove", this.mouseMove);
        this.pre_x = event.x;
      },
      mouseMove(event) {
        this.width += event.x - this.pre_x;
        if(this.width <= 150){
          this.width = this.pre_w;
          return;
        }
        this.pre_w = this.width;
        this.$emit("width-change", this.width +'|'+ (event.x - this.pre_x));
        this.pre_x = event.x;
      },
      mouseUp() {
        document.removeEventListener("mousemove", this.mouseMove);
      }
    }
  }
</script>

<style src="style/common/connections.css" scoped></style>