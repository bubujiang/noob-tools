export default {
  namespaced: true,
  state: {
    server_menus: [], //连接列表
    add_server_popup_show: false, //显示\隐藏连接添加框
    add_server_params: {
      //正添加连接的参数
      host: null,
      port: null,
      auth: null,
      name: null,
    },
    server_tabs: {
      "127.0.0.1:99": {
        name: "server1",
        info: {
          redis_version: "3.0.5",
          redis_git_sha1: "000",
          redis_build_id: "470780e9c85f8d8b",
        },
        db: {
          db0: { key_num: 11, keys: ["aa", "bb", "ccc"] },
          db1: { key_num: 12 },
        },
      },
      /*'127.0.0.2:99': {
                name:'server2',
                info: {redis_version:'3.0.5',redis_git_sha1:'000',redis_build_id:'470780e9c85f8d8b'},
                db: {db0:{keys:11},db1:{keys:12}}
            }*/
    }, //操作区
    current_selected_tab: { server: "127.0.0.1:99", db: "db1" }, //当前操作区
    error: { conn: '' },
  },
  mutations: {
    //显示\隐藏连接添加框
    popupSwitch(state) {
      state.add_server_popup_show = !state.add_server_popup_show;
    },
    //清除正添加连接的参数
    resetAddServerParams(state) {
      state.add_server_params = {
        host: null,
        port: null,
        auth: null,
        name: null,
      };
    },
    //添加连接
    addServer(state) {
      state.server_menus.push(state.add_server_params);
      state.add_server_params = {
        host: null,
        port: null,
        auth: null,
        name: null,
      };
      state.add_server_popup_show = false;
    },
    //切换操作区
    changeSelectedTab(state, selected_tab) {
      state.current_selected_tab = selected_tab;
    },
    //设置错误
    setError(state,error){
        console.log('error1',state.error,error);
        state.error[error.k] = error.v;
        console.log('error',state.error);
    },
    //删除一个menu
    delMenuByK(state,i){
        state.server_menus.splice(i,1);
    }
  },
};
