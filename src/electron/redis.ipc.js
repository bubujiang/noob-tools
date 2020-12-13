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

function makeThread(e,conn,workers,sort_worers,allow_max_worker_len){
    //console.log('mk start',conn);
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
    if(sort_worers.length > allow_max_worker_len){
        const rkey = sort_worers.pop();
        workers[rkey].postMessage({
            type: 'exit'
        });
        delete workers[rkey];
    }
}

async function testConn(e, conn){
    console.log('redis-test-conn start');
    console.log('params', conn);

    delete conn.name;

    console.log('c params',conn);

    let prom = new Promise((resolve, reject) => {
        const client = redis.createClient(conn);

        client.on("ready", function () {
            client.quit();
            resolve();
        });

        client.on("error", function (error) {
            reject(error);
        });
    });

    return await prom.then(()=>{
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

 exports.redisTestConn = testConn
 exports.redisMakeThread = makeThread
 exports.redisSortServer = sortServer