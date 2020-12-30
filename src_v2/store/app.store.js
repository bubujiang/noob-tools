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
  prompt: [
    /*{
            showed:0,//0没显示过,1显示过
            type:'',//error,notice,success
            level:'',//0右下角提示,1附加弹窗
            info:'',
            time:123123324
        }*/
  ],
  show_prompt:false
}

const mutations = {
  changePage(state, page) {
    state.current_page = page;
  },
  toggleShowNavigation(state){
    state.show_navigation = !state.show_navigation;
  },
  addPromp(state,{type,level,info}){
    Vue.set(state.prompt, state.prompt.length, {type,level,info,time:new Date().getTime()})
  },
  showPrompt(state){
    state.show_prompt = true
  },
  hidePrompt(state){
    state.show_prompt = false
  }
}

const actions = {
  showNewPromp(context,{type,level,info}){
    context.commit('addPromp',{type,level,info})
    context.commit('showPrompt')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};