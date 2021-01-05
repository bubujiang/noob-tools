import Vue from "vue";
const state = {
  navigation: [{
      name: "redis",
      page: "Redis",
    },
    {
      name: "mysql",
      page: "Mysql",
    },
  ],
  show_navigation: true,
  current_page: "Redis",
  prompts: [
    /*{
    showed: false, //false没显示过,true显示过
    type: 'error', //error,notice,success
    level: '0', //0右下角提示,1附加弹窗
    info: 'test1',
    time: 123123324
  }*/
  ],
  connections: [{
      type: "folder",
      name: "fa",
      child: [],
      //show: true
    },
    {
      type: "redis",
      name: "mine",
      host: "182.61.12.213",
      port: 6379,
      auth: "wGkfv`~@r&bv*7^%",
      state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
    },
    {
      type: "folder",
      name: "fb",
      child: [{
        type: "folder",
        name: "fba",
        child: [{
          type: "mysql",
          name: "mine1",
          host: "182.61.12.213",
          port: 6379,
          user: "wGkfv`~@r&bv*7^%",
          pwd: "sdddd",
          state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
        }, ],
        //show: true
      }, {
        type: "folder",
        name: "fbb",
        child: [{
          type: "mysql",
          name: "mine2",
          host: "182.61.12.213",
          port: 6379,
          user: "wGkfv`~@r&bv*7^%",
          pwd: "sdddd",
          state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
        }, ],
        show: false
      }, ],
      //show: true
    },
  ],
  //show_prompt: false
};

const mutations = {
  changePage(state, page) {
    state.current_page = page;
  },
  toggleShowNavigation(state) {
    state.show_navigation = !state.show_navigation;
  },
  addPromp(state, {
    type,
    level,
    info
  }) {
    Vue.set(state.prompts, state.prompts.length, {
      showed: 0,
      type,
      level,
      info,
      time: new Date().getTime(),
    });
  },
  //showPrompt(state) {
  //  state.show_prompt = true
  //},
  showedPrompt(state, i) {
    //console.log('start',i);
    Vue.set(state.prompts, i, {
      ...state.prompts[i],
      showed: true,
    });
    //console.log('end',state.prompts);
  },
};

const actions = {
  addNewPromp(context, {
    type,
    level,
    info
  }) {
    context.commit("addPromp", {
      type,
      level,
      info,
    });
    //context.commit('showPrompt')
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};