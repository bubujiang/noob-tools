const ipcRenderer = window['require']('electron').ipcRenderer;
import _ from "lodash";
//import Vue from 'vue'

export const Message = {
    onMessage(){
        ipcRenderer.on('renderer-redis-select-server', (event, message) => {
            console.log('return',message);
            //return;
            let key = null;
            for(const k in this.$store.state.RStore.server_menus){
                const menu = this.$store.state.RStore.server_menus[k];
                if(menu.host === message.menu.host && menu.port === message.menu.port){
                    key = k;
                    break;
                }
            }
            
            if(message.type === 'error'){
                console.log('key',key);
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k:key,s:-1})
                //弹窗
                const current_module = this.$store.state.AStore.current_navigation_item;
                if(current_module === 'Redis'){
                    //this.setError({k:'conn',v:message.msg});
                    this.$store.commit('RStore/setError',{k:'conn',v:message.msg})
                    return;
                }
            }else{
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k:key,s:2})
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
                //console.log(_.split(message.info,"\n",99));

                let info = {};
                const parts = _.split(message.info,"#",99);
                //console.log('parts',parts);

                for(const p in parts){
                    if(!parts[p]){
                        continue;
                    }
                    //console.log('parts[p]',parts[p]);
                    const rows = _.split(parts[p],"\n",99);

                    let first = true;
                    let first_n = 0;
                    for(const n in rows){
                        rows[n] = _.trim(rows[n]);
                        if(!rows[n]){
                            continue;
                        }

                        if(first){
                            first_n = n;
                            info[rows[n]] = {};
                            first = false;
                            continue;
                        }

                        

                        const row = _.split(rows[n],":",2);

                        if(rows[first_n] === 'Keyspace'){
                            //console.log('kkkk',_.split(row[1],",",3));
                            const dvs = _.split(row[1],",",3);
                            info[rows[first_n]][_.trim(row[0])] = [];
                            for(const i in dvs){
                                const dv = _.split(dvs[i],"=",2);
                                info[rows[first_n]][_.trim(row[0])][i] = dv[1];
                            }
                            //info[rows[first_n]][_.trim(row[0])] = _.split(row[1],",",3);
                        }else if(row.length > 1){
                            info[rows[first_n]][_.trim(row[0])] = _.trim(row[1]);
                        }
                    }
                }
                console.log('info',info);
                const server_tab = {k:message.menu.host+':'+message.menu.port,v:{
                    name:message.menu.name,
                    info
                }};

                this.$store.commit('RStore/editServerTab',server_tab)
                //修改current_selected_tab
                this.$store.commit('RStore/changeSelectedTab',{server:message.menu.host+':'+message.menu.port,db:null})
            }
        });
        ipcRenderer.on('renderer-redis-open-db',(event,message)=>{
            console.log('渲染进程接收 打开redis数据库 消息返回', message, '///////////////');

            let key = null;
            for(const k in this.$store.state.RStore.server_menus){
                const menu = this.$store.state.RStore.server_menus[k];
                if(menu.host === message.menu.host && menu.port === message.menu.port){
                    key = k;
                    break;
                }
            }

            if(message.type === 'error'){
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k:key,s:-1})
                //弹出提示
                const current_module = this.$store.state.AStore.current_navigation_item;
                if(current_module === 'Redis'){
                    this.$store.commit('RStore/setError',{k:'conn',v:message.msg})
                    return;
                }
            }else{
                const k = message.menu.host+':'+message.menu.port;
                const dk = message.info.db;
                const cursor = message.info.result[0];
                const keys = message.info.result[1];
                //修改servers_tab.db.db0.keys和servers_tab.db.db0.keys_cursor
                this.$store.commit('RStore/editServerTabDB',{k,dk,cursor,keys})
                //修改current_selected_tab
                this.$store.commit('RStore/changeSelectedTab',{server:k,db:message.info.db})
            }
        });
        ipcRenderer.on('renderer-redis-select-key',(event,message)=>{
            console.log('渲染进程接收 选择redis key 消息返回', message, '///////////////');

            let key = null;
            for(const k in this.$store.state.RStore.server_menus){
                const menu = this.$store.state.RStore.server_menus[k];
                if(menu.host === message.menu.host && menu.port === message.menu.port){
                    key = k;
                    break;
                }
            }

            if(message.type === 'error'){
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k:key,s:-1})
                //弹出提示
                const current_module = this.$store.state.AStore.current_navigation_item;
                if(current_module === 'Redis'){
                    this.$store.commit('RStore/setError',{k:'conn',v:message.msg})
                    return;
                }
            }else{
                const server_key = message.menu.host+':'+message.menu.port;
                const db_key = message.db_key;
                const key = message.key;
                const key_type = message.info.type;
                const key_ttl = message.info.ttl;
                const key_val = message.info.val;
                //修改servers_tab.db.db0.aa
                this.$store.commit('RStore/editServerTabDbKey',{server_key,db_key,key,key_type,key_ttl,key_val})
                //修改current_selected_tab
                this.$store.commit('RStore/changeSelectedTab',{server:server_key,db:db_key})
            }
        });
        ipcRenderer.on('renderer-redis-update-key',(event,message)=>{
            console.log('渲染进程开始处理 修改redis key 消息返回', message, '///////////////');
return;
            let key = null;
            for(const k in this.$store.state.RStore.server_menus){
                const menu = this.$store.state.RStore.server_menus[k];
                if(menu.host === message.menu.host && menu.port === message.menu.port){
                    key = k;
                    break;
                }
            }

            if(message.type === 'error'){
                //修改server menu状态
                this.$store.commit('RStore/updateServerState',{k:key,s:-1})
                //弹出提示
                const current_module = this.$store.state.AStore.current_navigation_item;
                if(current_module === 'Redis'){
                    this.$store.commit('RStore/setError',{k:'conn',v:message.msg})
                    return;
                }
            }else{
                const server_key = message.menu.host+':'+message.menu.port;
                const db_key = message.db_key;
                const key = message.key;
                const key_type = message.info.type;
                const key_ttl = message.info.ttl;
                const key_val = message.info.val;
                //修改servers_tab.db.db0.aa
                this.$store.commit('RStore/editServerTabDbKey',{server_key,db_key,key,key_type,key_ttl,key_val})
                //修改current_selected_tab
                //this.$store.commit('RStore/changeSelectedTab',{server:server_key,db:db_key})
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
            },
            redis_open_db:function(host,port,db){
                console.log('渲染进程发送 打开redis数据库 消息', host,port,db, '///////////////');
                ipcRenderer.send('renderer-redis-open-db',{host,port,db});
            },
            redis_select_key:function(host,port,db_k,key){
                console.log('渲染进程发送 选择redis key 消息', host,port,db_k,key, '///////////////');
                ipcRenderer.send('renderer-redis-select-key',{host,port,db_k,key});
            },
            redis_update_key:function(host,port,db_key,key_type,key,content){
                console.log('渲染进程发送 修改redis key 消息', host,port,db_key,key_type,key,content, '///////////////');
                ipcRenderer.send('renderer-redis-update-key',{host,port,db_key,key_type,key,content});
            }
        }
    }
}