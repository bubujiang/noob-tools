const Redis = require("ioredis");
const { Promise } = require("es6-promise");

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
    enableOfflineQueue: false,
  });

  client.on("connect", function() {
    success(client);
  });

  client.on("error", function(error) {
    fail(error);
  });

  return client;
}

function redisStringDataSet(redis, key, content, sucess, fail) {
  redis.set(key, content, (error, get_result) => {
    if (error) {
      fail(error);
    } else {
      //console.log('RVQERVQERG',type_result, result);
      sucess(get_result);
      //resolve(result,type_result);
    }
  });
}

function makeRendererResponseMsg(module, type, msg, ext = {}) {
  return {
    module,
    type,
    msg,
    ...ext,
  };
}

exports.createRedisClient = createRedisClient;
exports.makeRendererResponseMsg = makeRendererResponseMsg;
exports.redisStringDataSet = redisStringDataSet;
