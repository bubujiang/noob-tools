<template>
  <div class="client" :style="show_navigation ? '' : 'margin-left: 0;'">
    <keep-alive>
      <component v-bind:is="current_page"></component>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Redis from "components/redis/RedisBody.vue";
import Mysql from "components/mysql/MysqlBody.vue";

export default {
  components: { Redis,Mysql },
  computed: {
    ...mapState("AStore", ["current_page",'show_navigation']),
  },
};
</script>

<style src="style/app-client.css" scoped>
</style>