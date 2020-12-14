const Redis = require("ioredis");
const _ = require('lodash');
const {
    Worker
} = require('worker_threads');

/**
 * 是否是已经连接的服务
 * @param {Object} conn {host:"",port:"",auth:"",name:""}
 * @param {Object} workers 线程集合
 */
//function isConnected(conn, workers){
//    const key = conn.host + ':' + conn.port;
//    return _.hasIn(workers, key);
//}

/**
 * 渲染进程选择已经连接的服务
 * @param {*} conn 
 * @param {*} workers 
 * @param {*} redis_clients 
 */
/*function selectConnectedServerMenu(conn,workers,redis_clients){
    const key = conn.host + ':' + conn.port;

    if (!_.hasIn(workers, key)) {
        return {
            type: 'error',
            info: {message:'连接已经断开'}
        };
    }

    if(!_.hasIn(redis_clients, key)){
        return {
            type: 'error',
            info: {message:'连接已经断开'}
        };
    }

    const redis_client = redis_clients[key];
    redis_client.info("server", function (err, result) {
        if (err) {
            return {
                type: 'error',
                info: err
            };
        } else {
            return result
        }
      });

}*/


/**
 * 渲染进程选择一个服务连接
 * @param {Object} conn {host:"",port:"",auth:"",name:""}
 */
function selectServerMenu(conn, workers, sort_worers, redis_clients, max_len) {
    const key = conn.host + ':' + conn.port;

    



    //增加redis clients
    _createRedisClient(conn).then((client) => {
        redis_clients[key] = client;
    }).catch((error) => {
        return {
            type: 'error',
            info: error
        };
    });


    //const key = conn.host + ':' + conn.port;
    let cworker;
    if (_.hasIn(workers, key)) {
        //存在重排
        cworker = workers[key];
        for (const k in sort_worers) {
            if (sort_worers[k] === key) {
                sort_worers.splice(k, 1);
            }
        }
    } else {
        //新建放入
        cworker = new Worker('./src/worker/redis.worker.js');
        workers[key] = cworker;
    }
    //放入排序最上
    sort_worers.unshift(key);
    //删除最后一个
    if (sort_worers.length > max_len) {
        const rkey = sort_worers.pop();
        workers[rkey].postMessage({
            type: 'exit'
        });
        delete workers[rkey];
    }
}

/**
 * 测试连接
 * @param {Object} conn {host:"",port:"",auth:"",name:""}
 */
async function testConn(conn) {
    return await _createRedisClient(conn).then((client) => {
        client.quit();
        return {
            type: 'success'
        };
    }).catch((error) => {
        return {
            type: 'error',
            info: error
        };
    });
}

///////////////////////////////////////////////////////////
/**
 * 创建redis连接
 * @param {Object} conn {host:"",port:"",auth:"",name:""}
 */
function _createRedisClient(conn,success,fail,end) {
    //return new Promise((resolve, reject) => {
        const client = new Redis({
            port: conn.port,
            host: conn.host,
            family: 4,
            password: conn.auth ? conn.auth : null,
            db: 0,
            ////
            retryStrategy(times) {
                if (times > 2) {
                    return false;
                }
                return 1000;
            },
            ///
            autoResubscribe: false,
            enableOfflineQueue: false
        });

        client.on("connect", function () {
            success(client);
        });

        client.on("error", function (error) {
            fail(error);
        });
        //client.on("close", function (error) {
            //reject(error);
        //});
        client.on("end", function (error) {
            end(error);
        });

        return client;


    //});
}

exports.redisTestConn = testConn //测试连接
exports.redisSelectConnectedServerMenu = selectConnectedServerMenu //渲染进程选择一个已经存在的服务连接
exports.redisSelectServerMenu = selectServerMenu //渲染进程选择一个服务连接
exports.redisIsConnected = isConnected //是否是已经连接的服务