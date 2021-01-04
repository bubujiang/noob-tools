<template>
  <div class="connections">
    <div class="content">
      <div class="button">
        <IButton val="add_connection" v-on:b-click="()=>{}" />
      </div>
      <div class="list" v-if="Object.keys(connections).length">
        <div class="item" v-for="(connection,i) in connections" v-bind:key="i">
          <span>{{connection.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IButton from "components/common/IButton.vue";

export default {
    components: {
      IButton,
    },
    computed: {
      ...mapState("AStore", ["connections"]),
    },
}
</script>

<style src="style/common/connections.css" scoped></style>