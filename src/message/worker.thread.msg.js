const { createRedisClient } = require('./../method/redis.main.js');

const {
    exit
} = require('process');
const {
    parentPort
} = require('worker_threads');
const _ = require("lodash");

exports.Message = {
    redis:null,
    onMessage(){
        parentPort.on('message', (message) => {
            switch (message.type) {
                case 'renderer-redis-select-server':
                    this.get.main_th.redis_select_server(message.conn);
                    break;
                case 'renderer-redis-open-db':
                    console.log('工作进程接收到 打开redis数据库 消息', message, '////////////////');
                    this.get.main_th.redis_open_db(message.db);
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
            },
            redis_open_db:function(type,info,error){
                console.log('工作线程返回 打开redis数据库 消息 处理结果', type,info,error, '////////////////');
                parentPort.postMessage({msg_type:'renderer-redis-open-db',rtn_type:type,info,error});
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
            },
            redis_open_db:(db)=>{
                console.log('工作线程开始处理 打开redis数据库 消息', db, '////////////////');
                const redis = this.Message.redis;
                if(!redis){
                    this.Message.send.main_th.redis_open_db('error',null,'redis gone');
                    exit;
                }

                const dbn = _.replace(db, 'db', '');

                (new Promise((resolve,reject)=>{
                    redis.select(dbn, (error, result)=>{
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                }))
                .then((result)=>{
                    console.log('select',result);
                    return (new Promise((resolve,reject)=>{
                        redis.scan('0', (error, result)=>{
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                    }));
                })
                .then((result)=>{
                    this.Message.send.main_th.redis_open_db('success',{db,result},null);
                })
                .catch((error)=>{
                    this.Message.redis.quit();
                    this.Message.redis = null;
                    this.Message.send.main_th.redis_open_db('error',null,error);
                    exit();
                });
                

            }
        }
    }
}