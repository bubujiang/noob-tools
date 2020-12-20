//const exports = require("webpack");
const { createRedisClient,makeRendererResponseMsg } = require('./../method/redis.main.js');

const {
    exit
} = require('process');
const {
    parentPort,
    workerData
} = require('worker_threads');

exports.Message = {
    onMessage(){
        parentPort.on('message', (message) => {
            switch (message.type) {
                case 'renderer-redis-select-server':
                    this.get.main_th.redis_select_server(message.conn);
                    break;
                default:
                    console.log('exit');
                    exit;
                    break;
            }
        });
    },
    send:{
        main_th:{
            redis_select_server:function(type,redis,info,error){
                parentPort.postMessage({msg_type:'renderer-redis-select-server',rtn_type:type,redis,info,error});
            }
        }
    },
    get:{
        main_th:{
             redis_select_server: async (conn)=>{
                const redis = workerData.redis;
                console.log('worker process start',conn,workerData);
                if (!redis) {
                    const prom = ((params) => {
                        return new Promise((resolve, reject) => {
                            createRedisClient(params, resolve, reject);
                        });
                    })(conn);

                    let result = await prom.then((client) => {
                        return {
                            type: 'success',
                            client
                        }
                    }).catch((error) => {
                        return {
                            type: 'error',
                            error
                        }
                        //return makeRendererResponseMsg('redis','error',error.message);
                    });
        
                    console.log('worker process mid',result);

                    if (result.type === 'error') {
                        //console.log('sssssssssggggggggggg',this,this.Message.send);
                        this.Message.send.main_th.redis_select_server('error',null,null,result.error);
                        return;
                        //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'error',renderer:result});
                    } else {
                        redis = result.client;
                    }
                }
                ////获得info
                redis.info("server", function (error, result) {
                    if (error) {
                        redis.quit();
                        this.send.main_th.redis_select_server('error',null,null,error);
                        //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'error',renderer:makeRendererResponseMsg('redis','error',error)});
                    } else {
                        this.send.main_th.redis_select_server('success',redis,result,null);
                        //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'success',redis_client,renderer:makeRendererResponseMsg('redis','success','',{info:result})});
                    }
                });
            }
        }
    }
}