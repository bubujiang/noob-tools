/**
 * get:
 * redis-test-conn
 * redis-make-thread
 * redis-sort-server
 */
const redis = require("redis");
const _ = require('lodash');
const {
    Worker
} = require('worker_threads');
const {
    ipcMain
} = require('electron')

function sortServer(e,k){}

/**
 * 新建或重用线程
 * @param {*} e 
 * @param {Object} conn //连接参数
 * @param {Object} workers //线程对象集合
 * @param {Object} redis_clients //redis连接对象集合
 * @param {Array} sort_worers //线程排序
 * @param {Number} max_len //最大
 */
function makeThread(e,conn,workers,redis_clients,sort_worers,max_len){
    //放入
    const key = conn.host + ':' + conn.port;
    let cworker;
    if (_.hasIn(workers, key)) {
        cworker = workers[key];
        //提序
        for(const k in sort_worers){
            if(sort_worers[k] === key){
                sort_worers.splice(k,1);
            }
        }
    } else {
        cworker = new Worker('./src/worker/redis.worker.js');
        workers[key] = cworker;
    }
    //放入排序最上
    sort_worers.unshift(key);
    //删除最后一个
    if(sort_worers.length > max_len){
        const rkey = sort_worers.pop();
        workers[rkey].postMessage({
            type: 'exit'
        });
        delete workers[rkey];
    }
    //
    _createRedisClient(conn).then((client)=>{
        redis_clients[key] = client;
    }).catch((error)=>{
        delete workers[key];
        for(const k in sort_worers){
            if(sort_worers[k] === key){
                sort_worers.splice(k,1);
            }
        }
    });
    //redis_clients[key] = ;
    //return key;
}

async function testConn(e, conn){

    delete conn.name;

    return await _createRedisClient(conn).then((client)=>{
        client.quit();
        return {
            type: 'success'
        };
    }).catch((error)=>{
        return {
            type: 'error',
            info: error
        };
    });
 }

 function _createRedisClient(conn){
    return new Promise((resolve, reject) => {
        const client = redis.createClient(conn);

        client.on("ready", function () {
            //client.quit();
            resolve(client);
        });

        client.on("error", function (error) {
            reject(error);
        });
    });

    /*return prom.then(()=>{
        return {
            type: 'success'
        };
    }).catch((error)=>{
        return {
            type: 'error',
            info: error
        };
    });*/
 }

 /**
  * 获得redis服务数据
  * @param {Object} conn {name:"xxx",host:"127.0.0.1",port:22,auth:"auu"}
  */
 function getServerInfo(conn){

 }

 exports.redisTestConn = testConn //测试连接
 exports.redisMakeThread = makeThread //创建或复用线程、线程活跃度排序
 exports.redisSortServer = sortServer //客户端切换标签致使线程活跃度重排