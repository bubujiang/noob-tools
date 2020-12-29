import {
  Promise
} from "es6-promise";

const state = {
  connections_menu: [{
      host: "39.108.245.131",
      port: 6379,
      auth: null,
      name: "asddvaerb",
      //img: "",
      state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
    },
    {
      host: "182.61.12.213",
      port: 6379,
      auth: "wGkfv`~@r&bv*7^%",
      name: "asddvaerb22",
      //img: "",
      state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
    },
  ], //连接列表
  add_connection_popup_show: false, //显示\隐藏连接添加框
  add_connection_params: {
    //正添加连接的参数
    host: null,
    port: null,
    auth: null,
    name: null,
  },
  edit_connection_popup_show: false, //显示\隐藏连接编辑框
  edit_connection_key: "127.0.0.1:99",
  connections_tab: {
    "127.0.0.1:999": {
      name: "server1",
      info: {},
      db: {
        db0: {
          keys_cursor: 0, //SCAN命令游标
          keys: ["aa", "bb", "ccc"],
          vals: {
            aa: {
              type: "string",
              ttl: -1,
              raw_val: "wEFERG3G",
              show_val: "wEFERG3G",
              format: "json",
            },
          },
        },
      },
      state: 2, //-1连接出错，2已连接
    },
  }, //操作区
  current_connection_tab: {
    server: "127.0.0.1:99",
    db: "db1",
  }, //当前操作区
}

const mutations = {
  toggleAddConnectionPopupShow(state) {
    state.add_connection_popup_show = !state.add_connection_popup_show
  },
  addConnection(state, {
    name,
    host,
    port,
    auth
  }) {
    console.log('addConnection before', name, host, port, auth, '/////////////////');
    state.connections_menu = [...state.connections_menu, {
      name,
      host,
      port,
      auth
    }];
    console.log('addConnection after', state.connections_menu, '/////////////////');
  },
}

const actions = {
  addNewConnection(context) {
    const _ = require("lodash");
    let params = context.state.add_connection_params;
    params = {name:_.trim(params.name),host:_.trim(params.host),port:_.toNumber(_.trim(params.port)),auth:_.trim(params.auth)};
    const menus = context.state.connections_menu;
    console.log('addNewConnection before', params, '/////////////////');
    return new Promise((resolve, reject) => {
      //判断必填
      //判断类型
      if (!params.host) {
        reject('$$host must');
        return;
      }
      if(!params.port){
        reject('$$port err');
        return;
      }
      if (!params.name) {
        reject('$$name must');
        return;
      }
      //判断重复
      for(const i in menus){
        const menu = menus[i];

        if(menu.host === params.host && menu.port === params.port){
          reject('$$exist');
          return;
        }
      }
      //
      context.commit('addConnection',params)
      resolve('success');
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};