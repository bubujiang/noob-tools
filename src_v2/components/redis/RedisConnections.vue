<template>
  <div class="connections">
    <div class="content">
      <div class="button">
        <IButton val="add_connection" v-on:b-click="toggleAddConnectionPopupShow" />
      </div>
      <div class="list" v-if="Object.keys(connections_menu).length">
        <div class="item" v-for="(connection,i) in connections_menu" v-bind:key="i">
          <span>{{connection.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import IButton from "components/common/IButton.vue";

  export default {
    components: {
      IButton,
    },
    computed: {
      ...mapState("RStore", ["connections_menu"]),
    },
    methods: {
      ...mapMutations("RStore", ["toggleAddConnectionPopupShow"]),
    },
  };
</script>

<style src="style/redis/redis-connections.css" scoped></style>