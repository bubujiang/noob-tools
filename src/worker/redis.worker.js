const {
    exit
} = require('process');
const {
    parentPort,
    workerData
} = require('worker_threads');
const { createRedisClient } = require('./../method/redis.main.js');

function selectServerMenu(conn) {
    console.log('select-server-menu', conn);
    const redis_client = workerData.redis_client;
    
    if (!redis_client) {

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
                module: 'redis',
                type: 'error',
                msg: error.message
            };
        });

        if (result.type === 'error') {
            parentPort.postMessage(result);
            //return result;
        } else {
            redis_client = result.client;
        }

    }
    ////获得info
    redis_client.info("server", function (error, result) {
        if (error) {
            redis_client.quit();
            parentPort.postMessage({
                module: 'redis',
                type: 'error',
                msg: error
            });
        } else {
            parentPort.postMessage({
                module: 'redis',
                type: 'success',
                msg: 'success',
                data: result,
                client: redis_client
            });
        }
    });
}

function command(comm) {
    console.log('command', comm);
}

parentPort.on('message', (message) => {
    switch (message.type) {
        case 'select-server-menu': //用户选择一个服务连接
            selectServerMenu.call(this, message.conn);
            break;
        case 'command':
            command.call(this, message.comm);
            break;
        default:
            console.log('exit');
            exit;
            break;
    }
});