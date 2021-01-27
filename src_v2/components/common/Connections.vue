<template>
  <div
    class="connections"
    :style="'width:'+width+'px'"
  >
    <div class="content">
      <div
        class="button"
        ref="button"
      >
        <IButton
          val="add_connection"
          v-on:b-on="showType"
          color="#031234"
        />
      </div>
      <div
        class="new"
        v-show="type_show"
        v-on:mouseleave="hideType"
        ref="type"
      >
        <div style="height:37px;"></div>
        <div class="new-type">
          <div
            class="new-folder"
            v-on:click="showAddFolderWindow('')"
          >
            <img :src="require('image/new_folder.png')" />
          </div>
          <div
            class="new-connect"
            v-on:click="showAddConnectionWindow"
          >
            <img :src="require('image/new.png')" />
          </div>
        </div>
      </div>
      <div
        class="list"
        v-if="Object.keys(connections).length"
      >
        <div class="swap" :style="'width:'+(width-25)+'px'">
          <Connection
          v-for="(connection,i) in connections"
          v-bind:key="i"
          v-bind:index="i+''"
          v-bind:item="connection"
          top='1'
          v-on:c-folder="showAddFolderWindow($event)"
          v-on:c-connect="()=>{}"
        />
        </div>
      </div>
    </div>
    <span
      class="handle"
      @mousedown="startDrag"
    ><img :src="require('image/drag.png')" /></span>
    <AddConnectionFolder
      v-if="folder_show"
      v-on:close="folder_show = false"
      v-on:create="createFolder($event)"
    />
<RedisConnectionAdd v-bind:show="redis_add_show" />
  </div>
</template>

<script>
import IButton from "components/common/IButton.vue";
import Connection from "components/common/Connection.vue";
import AddConnectionFolder from "components/common/AddConnectionFolder.vue";
import RedisConnectionAdd from 'components/redis/RedisConnectionAdd.vue';

import { mapMutations } from "vuex";

import { mapState } from "vuex";

export default {
  components: {
    IButton,
    Connection,
    AddConnectionFolder,RedisConnectionAdd
  },
  data() {
    return {
      pre_x: 0,
      pre_w: 150,
      width: 150,
      redis_add_show: false,
      type_show: false, //创建类型列表显示与否
      folder_show: false, //创建文件夹弹窗显示与否
      connection_path: null, //当前创建的connections菜单的索引
    };
  },
  computed: {
    ...mapState("AStore", ["connections", "current_page"]),
  },
  created() {
    document.addEventListener("mouseup", this.endDrag);
  },
  destroyed() {
    document.removeEventListener("mouseup", this.endDrag);
  },
  methods: {
    startDrag(event) {
      document.addEventListener("mousemove", this.draging);
      this.pre_x = event.x;
    },

    endDrag() {
      document.removeEventListener("mousemove", this.draging);
    },

    draging(event) {
      this.width += event.x - this.pre_x;
      if (this.width <= 150) {
        this.width = this.pre_w;
        return;
      }
      this.pre_w = this.width;
      this.$emit("width-change", this.width + "|" + (event.x - this.pre_x));
      this.pre_x = event.x;
    },
    //////////////////////////////////////////////////////////
    showType() {
      this.$refs.type.style.left = this.$refs.button.offsetLeft + "px";
      this.type_show = true;
    },
    hideType() {
      this.type_show = false;
    },
    //////////////////////////////////////////////////////////
    showAddConnectionWindow() {
      if (this.current_page === "Redis") {
        this.redis_add_show = true;
        }
    },
    //////////////////////////////////////////////////////////
    showAddFolderWindow(path) {
      this.connection_path = path;
      this.folder_show = true;
    },
    async createFolder(folder) {
      await this.$store
        .dispatch("AStore/addConnection", {
          index: this.connection_path,
          data: {
            type: "folder",
            name: folder,
            show_child: false,
            child: [],
          },
        })
        .then((suc_msg) => {
          this.$store.commit("AStore/addPromp", {
            type: "success",
            level: 0,
            info: suc_msg,
          });
          this.folder_show = false;
        })
        .catch((err_msg) => {
          this.$store.commit("AStore/addPromp", {
            type: "notice",
            level: 0,
            info: err_msg,
          });
        });
    },
  },
};
</script>

<style src="style/common/connections.css" scoped></style>