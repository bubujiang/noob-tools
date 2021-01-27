import Vue from "vue";
import _ from "lodash";
import {
  Promise
} from "es6-promise";
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
      show_child: false,
      child: [],
      //show: true
    },
    {
      type: "redis",
      name: "mine",
      host: "182.61.12.213",
      port: 6379,
      auth: "wGkfv`~@r&bv*7^%",
      cluster: false,
      state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
      tsl: {
        private_key: '',
        public_key: '',
        authority: ''
      },
      ssh: {
        host: '',
        port: '',
        user: '',
        pwd: '',
        private_key: '',
        passphrase: '',
        timeout: ''
      }
    },
    {
      type: "folder",
      name: "fb",
      show_child: true,
      child: [{
        type: "folder",
        name: "fba",
        show_child: false,
        child: [{
          type: "mysql",
          name: "mine1",
          host: "182.61.12.213",
          port: 6379,
          user: "wGkfv`~@r&bv*7^%",
          pwd: "sdddd",
          state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
          tsl: {},
          ssh: {}
        }, ],
        //show: true
      }, {
        type: "folder",
        name: "fbb",
        show_child: false,
        child: [{
          type: "mysql",
          name: "mine2",
          host: "182.61.12.213",
          port: 6379,
          user: "wGkfv`~@r&bv*7^%",
          pwd: "sdddd",
          state: 0, //-1连接出错，0未连接，1,正在连接, 2已连接
        }, ],
        //show: false
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
  showedPrompt(state, i) {
    Vue.set(state.prompts, i, {
      ...state.prompts[i],
      showed: true,
    });
  },
  toggleChild(state, index) {

    let paths = _.split(index, '|', 99);

    if (index !== '' && paths.length == 1) {
      state.connections[paths[0]].show_child = !state.connections[paths[0]].show_child;
      //state.connections.splice(paths[0], 1);
    } else if(index !== '') {
      const start = paths.shift();
      const last = paths.pop();
      let str = 'state.connections[' + start + ']';
      for (const i in paths) {
        const path = paths[i];
        str += '.child[' + path + ']';
      }
      str += '.child[' + last + '].show_child';
      str = str + '=!' + str;
      //console.log('str',str);
      eval(str);
    }
  },
  delConnection(state, index) {
    let paths = _.split(index, '|', 99);

    if (paths.length == 1) {
      state.connections.splice(paths[0], 1);
    } else {
      const start = paths.shift();
      const last = paths.pop();
      let str = 'state.connections[' + start + ']';
      for (const i in paths) {
        const path = paths[i];
        str += '.child[' + path + ']';
      }
      str += '.child.splice(' + last + ',1)';
      eval(str);
    }
  },
  addConnection(state, {
    index,
    data
  }) {
    if (index === '') {
      //顶层
      state.connections.splice(0, 0, data);
    } else {
      let paths = _.split(index, '|', 99);

      if (paths.length == 1) {
        state.connections[paths[0]].child.splice(0, 0, data);
      } else {
        const start = paths.shift();
        const last = paths.pop();
        let str = 'state.connections[' + start + ']';
        for (const i in paths) {
          const path = paths[i];
          str += '.child[' + path + ']';
        }
        str += '.child[' + last + '].child.splice(0,0, JSON.parse(\'' + JSON.stringify(data) + '\'))';
        eval(str);
      }
    }
  }
};

const actions = {
  addConnection(context, {
    index,
    data
  }) {
    return new Promise((resolve, reject) => {
      let childs = _.cloneDeep(state.connections);
      const paths = _.split(index, '|', 99);

      if (paths[0] && paths.length == 1) {
        childs = _.cloneDeep(childs[paths[0]].child);
      } else if (paths[0] && paths.length > 1) {
        const start = paths.shift();
        const last = paths.pop();
        let str = 'childs[' + start + ']';
        for (const i in paths) {
          const path = paths[i];
          str += '.child[' + path + ']';
        }
        str += '.child[' + last + '].child';
        childs = eval(str);
      }

      for (const i in childs) {
        const child = childs[i];
        if (child.name === data.name && child.type === data.type) {
          reject('exist');
          return;
        }
      }

      context.commit('addConnection', {
        index,
        data
      })

      if (data.type === 'folder') {
        context.commit('toggleChild', index)
      }

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