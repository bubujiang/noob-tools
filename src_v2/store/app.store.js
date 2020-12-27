//let id = 1;
export default {
  namespaced: true,
  state: {
    navigation_items: [
      {
        //id: id++,
        name: "redis",
        page: "Redis",
      },
      {
        //id: id++,
        name: "mysql",
        page: "Mysql",
      },
    ],
    current_page: "Redis",
    prompt: [/*{
        type:'',//error,notice,success
        level:'',//0右下角提示,1附加弹窗
        msg:''
    }*/],
  },
  mutations: {
    changePage(state, page) {
      state.current_page = page;
    },
  },
};
