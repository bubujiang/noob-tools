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
                }else{
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

                let info;
                const parts = _.split(message.info,"#",99);
                console.log('parts',parts);

                for(const p in parts){
                    if(!parts[p]){
                        continue;
                    }
                    console.log('parts[p]',parts[p]);
                    const rows = _.split(parts[p],"\n",99);

                    for(const n in rows){
                        rows[n] = _.trim(rows[n]);
                        if(!rows[n]){
                            continue;
                        }

                        if(!n){
                            console.log('0',rows[n]);
                        }

                        console.log('rows[n]',rows[n]);

                        const row = _.split(rows[n],":",2);
                        console.log('row',row);


                    }


                }
return;




                for(const p in parts){
                    if(!parts[p]){
                        continue;
                    }
                    console.log('parts[p]',parts[p]);
                    const rows = _.split(parts[p],"\n",99);
                    
                    for(const n in rows){
                        if(!rows[n]){
                            continue;
                        }
                        console.log('rows',rows[n]);
                        const row = _.split(rows[n],":",2);
                        if(!row){
                            continue;
                        }
                        console.log('row',row);
                        continue;
                        if(!rows){
                            continue;
                        }
                        if(n === 0){
                            info[rows] = {};
                            continue;
                        }
                        //const row = _.split(rows[n],":",2);
                        //info[rows[0]][row[0]] = row[1];
                        
                    }
                }
                console.log('info',info);
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