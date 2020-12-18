const _ = require('lodash');
const {
    Worker,
    ipcMain
} = require('worker_threads');
const {
    createRedisClient,
    makeRendererResponseMsg
} = require('./../method/redis.main.js');


/**
 * 渲染进程选择一个服务连接
 * @param {Object} conn {host:"",port:"",auth:""}
 */
async function selectServerMenu(conn, win, workers, sort_worers, redis_clients, max_len) {
    const key = conn.host + ':' + conn.port;
    /////////////////////////////////////////////////////////////线程相关操作
    let redis_client;
    if (_.hasIn(redis_clients, key)) {
        redis_client = redis_clients[key];
    }

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
            workerData: {
                redis_client
            },
        });

        cworker.on('message', (message) => {
            switch (message.th_msg_type) {
                case 'th-select-server-menu-return': //用户选择一个服务连接
                    if (message.th_rtn_type === 'error') {
                        //错误删除线程并返回错误
                        cworker.postMessage({
                            type: 'exit', //退出
                        });
                        win.webContents.send('redis-render-select-server-menu-return', message.renderer)
                        //删除
                        for (const k in sort_worers) {
                            if (sort_worers[k] === key) {
                                sort_worers.splice(k, 1);
                            }
                        }
                        delete workers[key];
                    } else {
                        //返回成功消息并添加到redis集合
                        win.webContents.send('redis-render-select-server-menu-return', message.renderer)
                        redis_clients[key] = message.redis_client
                    }
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
        type: 'th-select-server-menu', //用户选择一个服务连接
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
            createRedisClient(params, resolve, reject);
        });
    })(conn);

    return await prom.then((client) => {
        client.quit();
        return makeRendererResponseMsg('redis', 'success', '连接成功!');
    }).catch((error) => {
        return makeRendererResponseMsg('redis', 'error', error.message);
    });
}

exports.redisTestConn = testConn //测试连接
exports.redisSelectServerMenu = selectServerMenu //渲染进程选择一个服务连接