import Vue from 'vue'
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
  prompts: [/*{
    showed: false, //false没显示过,true显示过
    type: 'error', //error,notice,success
    level: '0', //0右下角提示,1附加弹窗
    info: 'test1',
    time: 123123324
  }*/],
  //show_prompt: false
}

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
      showed:0,
      type,
      level,
      info,
      time: new Date().getTime()
    })
  },
  //showPrompt(state) {
  //  state.show_prompt = true
  //},
  showedPrompt(state,i) {
    console.log('start',i);
    Vue.set(state.prompts, i, {
      ...state.prompts[i],showed:true
    })
    console.log('end',state.prompts);
  }
}

const actions = {
  addNewPromp(context, {
    type,
    level,
    info
  }) {
    context.commit('addPromp', {
      type,
      level,
      info
    })
    //context.commit('showPrompt')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};