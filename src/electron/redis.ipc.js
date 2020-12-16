const Redis = require("ioredis");
const _ = require('lodash');
const {
    Worker
} = require('worker_threads');


/**
 * 渲染进程选择一个服务连接
 * @param {Object} conn {host:"",port:"",auth:""}
 */
async function selectServerMenu(conn, workers, sort_worers, redis_clients, max_len) {
    const key = conn.host + ':' + conn.port;
    ////////////////////////////////////////////////////////redis相关操作
    //获得redis client
    //出错返回
    let redis_client;
    if (_.hasIn(redis_clients, key)) {
        redis_client = redis_clients[key];
    } else {

        const prom = ((params) => {
            return new Promise((resolve, reject) => {
                _createRedisClient(params, resolve, reject);
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
                info: error
            };
        });

        if (result.type === 'error') {
            return result;
        } else {
            redis_client = result.client;
        }

    }
    /////////////////////////////////////////////////////////////线程相关操作
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
        cworker = new Worker('./src/worker/redis.worker.js', {
            workerData: workers,
            sort_worers,
            redis_clients
        });

        cworker.on('message', (message) => {
            switch (message.type) {
                case 'select-server-menu'://用户选择一个服务连接
                    selectServerMenu.call(this,message.conn);
                    break;
                case 'command':
                    command.call(this,message.comm);
                    break;
                default:
                    console.log('exit');
                    exit;
                    break;
            }
        })
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
    /////////////////////////////////////////////////////////////////转到线程内操作
    cworker.postMessage({
        type: 'select-server-menu',
        conn
    });
}

/**
 * 测试连接
 * @param {Object} conn {host:"",port:"",auth:""}
 */
async function testConn(conn) {
    const prom = ((params) => {
        return new Promise((resolve, reject) => {
            _createRedisClient(params, resolve, reject);
        });
    })(conn);

    return await prom.then((client) => {
        client.quit();
        return {
            module: 'redis',
            type: 'success',
            msg: '连接成功!'
        };
    }).catch((error) => {
        return {
            module: 'redis',
            type: 'error',
            msg: error.message
        };
    });
}

///////////////////////////////////////////////////////////
/**
 * 创建redis连接
 * @param {Object} conn {host:"",port:"",auth:""}
 */
function _createRedisClient(conn, success, fail) {
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

    return client;
}

exports.redisTestConn = testConn //测试连接
//exports.redisSelectConnectedServerMenu = selectConnectedServerMenu //渲染进程选择一个已经存在的服务连接
exports.redisSelectServerMenu = selectServerMenu //渲染进程选择一个服务连接
//exports.redisIsConnected = isConnected //是否是已经连接的服务