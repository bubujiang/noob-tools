const Redis = require("ioredis");

function createRedisClient(conn, success, fail) {
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

exports.createRedisClient = createRedisClient;