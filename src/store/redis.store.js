import _ from "lodash";

export default {
  namespaced: true,
  state: {
    server_menus: [{
      host: '39.108.245.131',
      port: 6379,
      auth: null,
      name: 'asddvaerb',
      img: '',
      state: 0 //-1连接出错，0未连接，1,正在连接, 2已连接 
    }], //连接列表
    add_server_popup_show: false, //显示\隐藏连接添加框
    add_server_params: {
      //正添加连接的参数
      host: null,
      port: null,
      auth: null,
      name: null,
    },
    edit_server_popup_show: false, //显示\隐藏连接编辑框
    edit_server_params: {
      //正编辑连接的参数
      host: null,
      port: null,
      auth: null,
      name: null,
    },
    server_tabs: {
      "127.0.0.1:999": {
        name: "server1",
        info: {},
        db: {
          db0: {
            keys_cursor: 0, //SCAN命令游标
            keys: ["aa", "bb", "ccc"],
            val: {
              aa: {
                type: 'string',
                ttl: -1,
                raw_val: 'wEFERG3G',
                show_val: 'wEFERG3G',
                format:'json'
              }
            }
          }
        },
        state: 2 //-1连接出错，2已连接
      },
    }, //操作区
    current_selected_tab: {
      /*server: "127.0.0.1:99",
      db: "db1"*/
    }, //当前操作区
    error: {
      conn: ''
    },
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
      state.server_menus.push({
        ...state.add_server_params,
        state: 0,
        img: ''
      });
      state.add_server_params = {
        host: null,
        port: null,
        auth: null,
        name: null,
      };
      state.add_server_popup_show = false;
    },
    /////////////////////////////////////////////////////////////////////
    //初始连接编辑框
    initEditPopup(state, menu) {
      state.edit_server_params = {
        ...menu
      };
    },
    //显示\隐藏连接编辑框
    popupEditSwitch(state) {
      state.edit_server_popup_show = !state.edit_server_popup_show;
    },
    //清除正编辑连接的参数
    resetEditServerParams(state) {
      state.edit_server_params = {
        host: null,
        port: null,
        auth: null,
        name: null,
      };
    },
    //确认编辑
    editServer(state, key) {
      //state.server_menus[0].name = 'ddddddff';
      state.server_menus[Number(key)].host = state.edit_server_params.host;
      state.server_menus[Number(key)].port = state.edit_server_params.port;
      state.server_menus[Number(key)].auth = state.edit_server_params.auth;
      state.server_menus[Number(key)].name = state.edit_server_params.name;
      state.server_menus[Number(key)].state = 0;
      //state.server_menus[Number(key)] = {...state.edit_server_params};
      state.edit_server_params = {
        host: null,
        port: null,
        auth: null,
        name: null,
      };
      state.edit_server_popup_show = false;
    },
    //修改连接状态正在连接
    updateServerState(state, key_state) {
      const key = Number(key_state.k);
      const new_state = Number(key_state.s);
      const old_state = state.server_menus[key].state;

      console.log('state', old_state, new_state);

      if (new_state === 1) {
        if (old_state === 0 || old_state === -1) {
          state.server_menus[key].state = new_state;
          state.server_menus[key].img = require("assets/loading.gif");
        }
      } else if (new_state === -1) {
        if (old_state === 1 || old_state === 2) {
          state.server_menus[key].state = new_state;
          state.server_menus[key].img = require("assets/error.png");
        }
      } else if (new_state === 2) {
        if (old_state === 1) {
          state.server_menus[key].state = new_state;
          state.server_menus[key].img = require("assets/conned.png");
        }
      }

      console.log('state after', state.server_menus);
    },
    ///////////////////////////////////////////////////////////////////////
    //切换操作区
    changeSelectedTab(state, selected_tab) {
      state.current_selected_tab = selected_tab;
      console.log('changeSelectedTab', state.current_selected_tab);
    },
    //修改操作区
    editServerTab(state, server_tab) {
      console.log('editServerTab22', state.server_tabs);
      const key = server_tab.k;
      const val = server_tab.v;
      if (_.hasIn(state.server_tabs, key)) {
        state.server_tabs[key] = {
          ...state.server_tabs[key],
          ...val
        };
      } else {
        state.server_tabs[key] = val;
        console.log('editServerTab2233', state.server_tabs);
        //state.server_tabs[key] = {...val};
      }
      console.log('editServerTab', state.server_tabs);
    },
    //修改操作区db keys
    editServerTabDB(state, dbd) {
      const key = dbd.k;
      const db_key = dbd.dk;
      const keys_cursor = dbd.cursor;
      const keys = dbd.keys;

      console.log('修改操作区db keys', dbd, '/////////////////');

      if (!_.hasIn(state.server_tabs[key], 'db')) {
        state.server_tabs[key].db = {};
      }
      if (!_.hasIn(state.server_tabs[key].db, db_key)) {
        state.server_tabs[key].db[db_key] = {};
        state.server_tabs[key].db[db_key].keys = [];
      }

      state.server_tabs[key].db[db_key].keys_cursor = keys_cursor
      state.server_tabs[key].db[db_key].keys = _.union(state.server_tabs[key].db[db_key].keys, keys)

      console.log('修改操作区db keys后', state.server_tabs[key], '/////////////////');
    },
    //修改redis key
    editServerTabDbKey(state, params) {
      console.log('editServerTabDbKey', params);
      const server_key = params.server_key;
      const db_key = params.db_key;
      const key = params.key;
      const key_type = params.key_type;
      const key_ttl = params.key_ttl;
      const key_val = params.key_val;
      let show_val = params.key_val;
      let format = 'raw';

      if (!_.hasIn(state.server_tabs[server_key], 'db')) {
        state.server_tabs[server_key].db = {};
      }
      if (!_.hasIn(state.server_tabs[server_key].db, db_key)) {
        state.server_tabs[server_key].db[db_key] = {};
      }
      if (!_.hasIn(state.server_tabs[server_key].db[db_key], 'val')) {
        state.server_tabs[server_key].db[db_key].val = {};
      }
      if (!_.hasIn(state.server_tabs[server_key].db[db_key].val, key)) {
        state.server_tabs[server_key].db[db_key].val[key] = {};
      } else {
        show_val = state.server_tabs[server_key].db[db_key].val[key].show_val;
        format = state.server_tabs[server_key].db[db_key].val[key].format;
      }

      state.server_tabs[server_key].db[db_key].val = {
        ...state.server_tabs[server_key].db[db_key].val,
        [key]: {
          type: key_type,
          ttl: key_ttl,
          raw_val: key_val,
          show_val,format
        }
      };
      //state.server_tabs[server_key].db[db_key].val[key].type = key_type;
      //state.server_tabs[server_key].db[db_key].val[key].ttl = key_ttl;
      //state.server_tabs[server_key].db[db_key].val[key].val = key_val;

      //state.server_tabs[server_key].db[db_key].val[key] = {type:key_type,ttl:key_ttl,val:key_val};
      console.log('editServerTabDbKey after', state.server_tabs);
    },
    //
    async keyViewAs(state, params) {
      const server_key = params.server_key;
      const db_key = params.db_key;
      const key = params.key;
      const as = params.as;
      const v = _.clone(state.server_tabs[server_key].db[db_key].val[key]);

      if(as === 'json'){
        const format2json = require('format-to-json');

        let fmtInfo = await format2json(v.raw_val);
        
        v.show_val = fmtInfo.result;
        v.show_val = 'aefwegw4g';
        v.format = 'json';

        console.log('keyViewAs afdddd', state.server_tabs[server_key].db[db_key].val);

        console.log(fmtInfo.result);
      }else if(as === 'raw'){
        //const format2json = require('format-to-json');

        //let fmtInfo = await format2json(v.raw_val);
        
        v.show_val = v.raw_val;
        v.show_val = 'aefwegw4gccc';
        v.format = 'raw';

        console.log('keyViewAs afdddd', state.server_tabs[server_key].db[db_key].val);

        //console.log(fmtInfo.result);
      }
      //v.show_val = 'aefwegw4gsssssss';
      state.server_tabs[server_key].db[db_key].val[key] = v;
      
      state.server_tabs[server_key].db[db_key].val = {
        ...state.server_tabs[server_key].db[db_key].val,
        //[key]: v,
        sDvarv:Math.ceil(Math.random()*10)
      };

      console.log('keyViewAs af', state.server_tabs[server_key].db[db_key].val);
    },
    //设置错误
    setError(state, error) {
      //console.log('error1',state.error,error);
      state.error[error.k] = error.v;
      //console.log('error',state.error);
    },
    //删除一个menu
    delMenuByK(state, i) {
      state.server_menus.splice(i, 1);
    }
    //
  },
};