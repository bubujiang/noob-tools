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
            type:'',//error,notice,success
            level:'',//0右下角提示,1附加弹窗
            msg:''
        }*/
  ],
}

const mutations = {
  changePage(state, page) {
    state.current_page = page;
  },
  toggleShowNavigation(state){
    state.show_navigation = !state.show_navigation;
  }
}

export default {
  namespaced: true,
  state,
  mutations
};