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
    <span
      class="handle"
      @mousedown="startDrag"
    ><img :src="require('image/drag.png')" /></span>
    <AddConnectionFolder
      v-if="folder_show"
      v-on:close="folder_show = false"
      v-on:create="createFolder($event)"
    />
  </div>
</template>

<script>
import IButton from "components/common/IButton.vue";
import Connection from "components/common/Connection.vue";
import AddConnectionFolder from "components/common/AddConnectionFolder.vue";

import { mapMutations } from "vuex";

import { mapState } from "vuex";

export default {
  components: {
    IButton,
    Connection,
    AddConnectionFolder,
  },
  data() {
    return {
      pre_x: 0,
      pre_w: 150,
      width: 150,
      type_show: false, //创建类型列表显示与否
      folder_show: false, //创建文件夹弹窗显示与否
      connection_path:null //当前创建的connections菜单的索引
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
        this.$store.commit("RStore/toggleAddConnectionPopupShow");
      }
    },
    //////////////////////////////////////////////////////////
    showAddFolderWindow(path){
      //console.log('ppppppppppppppppppppppp',path);
      this.connection_path = path;
      this.folder_show = true;
    },
    createFolder(folder) {
      this.$store.commit("AStore/addConnection", {
        index:this.connection_path,
        data: {
          type: "folder",
          name: folder,
          child: [],
        },
      });
      this.folder_show = false;
    },
  },
};
</script>

<style src="style/common/connections.css" scoped></style>