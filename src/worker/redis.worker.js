/**
 * connect
 * command
 * exit
 */
const { exit } = require('process');
const { parentPort, workerData } = require('worker_threads');

function selectServerMenu(conn){
    console.log('select-server-menu',conn);
    const key = conn.host + ':' + conn.port;
    //获得redis client
    //出错返回
    let redis_client;
    if (_.hasIn(redis_clients, key)) {
        redis_client = redis_clients[key];
    }else{

        const prom = ((params) => {
            return new Promise((resolve, reject) => {
                _createRedisClient(params, resolve, reject);
            });
        })(conn);

        let result =  await prom.then((client) => {
            //return {
            //    type: 'success',
            //    client
            //}
        }).catch((error) => {
            return {
                type: 'error',
                info: error
            };
        });

        if(result.type === 'error'){
            return result;
        }else{
            redis_client = result.client;
        }

    }
    ////
}

function command(comm){
    console.log('command',comm);
}

parentPort.on('message', (message) => {
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
});

