const Redis = require("ioredis");

/**
 * 
 * @param @param {Object} conn {host:"",port:"",auth:""}
 * @param {Function} success 
 * @param {Function} fail 
 */
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

function makeRendererResponseMsg(module,type,msg,ext={}) {
    return {
        module,type,msg,...ext
    }
}

exports.createRedisClient = createRedisClient;
exports.makeRendererResponseMsg = makeRendererResponseMsg;