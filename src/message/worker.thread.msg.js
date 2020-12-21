const { createRedisClient } = require('./../method/redis.main.js');

const {
    exit
} = require('process');
const {
    parentPort
} = require('worker_threads');

exports.Message = {
    redis:null,
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
            redis_select_server:function(type,info,error){
                parentPort.postMessage({msg_type:'renderer-redis-select-server',rtn_type:type,info,error});
            }
        }
    },
    get:{
        main_th:{
             redis_select_server: async (conn)=>{
                // console.log('svaerge5gw5hw4hwthw4thtw4thw45hw45h',this)
                //const redis = workerData.redis;
                //let redis = this.Message.redis;
                console.log('worker process start', conn, this.Message.redis, '////////////////////////');
                if (!this.Message.redis) {
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
                    });
        
                    console.log('worker process get redis', result, '////////////////////////');

                    if (result.type === 'error') {
                        console.log('worker process get redis error', '////////////////////////');
                        //console.log('sssssssssggggggggggg',this,this.Message.send);
                        this.Message.send.main_th.redis_select_server('error',null,result.error);
                        exit();
                        return;
                        //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'error',renderer:result});
                    } else {
                        this.Message.redis = result.client;
                        console.log('worker process get redis sucess', this.Message.redis, '////////////////////////');
                    }
                }
                ////获得info
                this.Message.redis.info("all", (error, result)=>{
                    console.log('worker process get info', error, result, '////////////////////////');
                    if (error) {
                        this.Message.redis.quit();
                        this.Message.redis = null;
                        //delete redis;
                        this.Message.send.main_th.redis_select_server('error',null,error);
                        exit();
                        //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'error',renderer:makeRendererResponseMsg('redis','error',error)});
                    } else {
                        this.Message.send.main_th.redis_select_server('success',result,null);
                        //delete redis;
                        //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'success',redis_client,renderer:makeRendererResponseMsg('redis','success','',{info:result})});
                    }
                });
            }
        }
    }
}