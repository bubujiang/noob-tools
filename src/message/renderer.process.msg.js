const ipcRenderer = window['require']('electron').ipcRenderer;
//import Vue from 'vue'

export const Message = {
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