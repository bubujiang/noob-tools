const Redis = require("ioredis");
module.exports = {
    createRedisConnect({
        host,
        port,
        auth
    }) {

        return new Promise((resolve,reject)=>{
            const client = new Redis({
                port,
                host,
                family: 4,
                password: auth ? auth : null,
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
                enableOfflineQueue: false,
            });

            client.on("connect", function () {
                resolve(client);
            });
    
            client.on("error", function (error) {
                reject(error);
            });
        });

    }
}