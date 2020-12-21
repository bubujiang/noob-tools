const ipcRenderer = window['require']('electron').ipcRenderer;
//import Vue from 'vue'

export const Message = {
    onMessage(){
        ipcRenderer.on('renderer-redis-select-server', (event, message) => {
            //console.log(message);
            //return;
            for(const k in this.$store.state.RStore.server_menus){
                const menu = this.$store.state.RStore.server_menus[k];
                if(menu.host === message.menu.host && menu.port === message.menu.port){
                    return;
                }
            }
            
            if(message.type === 'error'){
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k,s:-1})
                //弹窗
                const current_module = this.$store.state.AStore.current_navigation_item;
                if(current_module === 'Redis'){
                    //return;
                }else{
                    return;
                }
            }else{
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k,s:2})
                //修改或添加server_tabs
                /**
                 * "127.0.0.1:99": {
        name: "server1",
        info: {
          redis_version: "3.0.5",
          redis_git_sha1: "000",
          redis_build_id: "470780e9c85f8d8b",
        },
        db: {
          db0: {
            key_num: 11,
            keys: ["aa", "bb", "ccc"]
          },
          db1: {
            key_num: 12
          },
        },
        state:2//-1连接出错，2已连接
      },
                 */
                const server_tab = {k:message.menu.host+':'+message.menu.port,v:{
                    name:message.menu.name,
                    info:message.info
                }};
                this.$store.commit('RStore/editServerTab',server_tab)
                //修改current_selected_tab
                this.$store.commit('RStore/changeSelectedTab',{server:message.menu.host+':'+message.menu.port,db:null})
            }
        });
    },
    get:{},
    send:{
        renderer:{
            redis_test_server:function(conn,success,error){
                ipcRenderer.invoke('renderer-redis-test-conn', conn).then((result) => {
                    const current_module = this.$store.state.AStore.current_navigation_item;
                    if(current_module !== 'Redis'){
                        return;
                    }
                    if(result.type === 'success'){
                        success('success')
                    }else{
                        error(result.msg)
                    }
                })
            },
            redis_select_server:function(conn){
                ipcRenderer.send('renderer-redis-select-server',conn);
            }
        }
    }
}