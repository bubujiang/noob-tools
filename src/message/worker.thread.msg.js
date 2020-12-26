const {
  createRedisClient,
  redisStringDataSet,
} = require("./../method/redis.main.js");

const { exit } = require("process");
const { parentPort } = require("worker_threads");
const _ = require("lodash");

exports.Message = {
  redis: null,
  onMessage() {
    parentPort.on("message", (message) => {
      switch (message.type) {
        case "renderer-redis-select-server":
          this.get.main_th.redis_select_server(message.conn);
          break;
        case "renderer-redis-open-db":
          console.log(
            "工作进程接收到 打开redis数据库 消息",
            message,
            "////////////////"
          );
          this.get.main_th.redis_open_db(message.db);
          break;
        case "renderer-redis-select-key":
          console.log(
            "工作线程接收到 选择redis key 消息",
            message,
            "////////////////"
          );
          this.get.main_th.redis_select_key(message.db_key, message.key);
          break;
        case "renderer-redis-update-key":
          console.log(
            "工作线程接收到 修改redis key 消息",
            message,
            "////////////////"
          );
          this.get.main_th.redis_update_key(
            message.db_key,
            message.key_type,
            message.key,
            message.content
          );
          break;
        default:
          console.log("exit");
          exit;
          break;
      }
    });
  },
  send: {
    main_th: {
      redis_select_server: function(type, info, error) {
        parentPort.postMessage({
          msg_type: "renderer-redis-select-server",
          rtn_type: type,
          info,
          error,
        });
      },
      redis_open_db: function(type, info, error) {
        console.log(
          "工作线程返回 打开redis数据库 消息 处理结果",
          type,
          info,
          error,
          "////////////////"
        );
        parentPort.postMessage({
          msg_type: "renderer-redis-open-db",
          rtn_type: type,
          info,
          error,
        });
      },
      redis_select_key: function(type, info, error) {
        console.log(
          "工作线程返回 选择redis key 消息 处理结果",
          type,
          info,
          error,
          "////////////////"
        );
        parentPort.postMessage({
          msg_type: "renderer-redis-select-key",
          rtn_type: type,
          info,
          error,
        });
      },
      redis_update_key: function(type, info, error) {
        console.log(
          "工作线程返回 修改redis key 消息 处理结果",
          type,
          info,
          error,
          "////////////////"
        );
        parentPort.postMessage({
          msg_type: "renderer-redis-update-key",
          rtn_type: type,
          info,
          error,
        });
      },
    },
  },
  get: {
    main_th: {
      redis_select_server: async (conn) => {
        // console.log('svaerge5gw5hw4hwthw4thtw4thw45hw45h',this)
        //const redis = workerData.redis;
        //let redis = this.Message.redis;
        console.log(
          "worker process start",
          conn,
          this.Message.redis,
          "////////////////////////"
        );
        if (!this.Message.redis) {
          const prom = ((params) => {
            return new Promise((resolve, reject) => {
              createRedisClient(params, resolve, reject);
            });
          })(conn);

          let result = await prom
            .then((client) => {
              return {
                type: "success",
                client,
              };
            })
            .catch((error) => {
              return {
                type: "error",
                error,
              };
            });

          console.log(
            "worker process get redis",
            result,
            "////////////////////////"
          );

          if (result.type === "error") {
            console.log(
              "worker process get redis error",
              "////////////////////////"
            );
            //console.log('sssssssssggggggggggg',this,this.Message.send);
            this.Message.send.main_th.redis_select_server(
              "error",
              null,
              result.error
            );
            exit();
            return;
            //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'error',renderer:result});
          } else {
            this.Message.redis = result.client;
            console.log(
              "worker process get redis sucess",
              this.Message.redis,
              "////////////////////////"
            );
          }
        }
        ////获得info
        this.Message.redis.info("all", (error, result) => {
          console.log(
            "worker process get info",
            error,
            result,
            "////////////////////////"
          );
          if (error) {
            this.Message.redis.quit();
            this.Message.redis = null;
            //delete redis;
            this.Message.send.main_th.redis_select_server("error", null, error);
            exit();
            //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'error',renderer:makeRendererResponseMsg('redis','error',error)});
          } else {
            this.Message.send.main_th.redis_select_server(
              "success",
              result,
              null
            );
            //delete redis;
            //parentPort.postMessage({th_msg_type:'th-select-server-menu-return',th_rtn_type:'success',redis_client,renderer:makeRendererResponseMsg('redis','success','',{info:result})});
          }
        });
      },
      redis_open_db: (db) => {
        console.log(
          "工作线程开始处理 打开redis数据库 消息",
          db,
          "////////////////"
        );
        const redis = this.Message.redis;
        if (!redis) {
          this.Message.send.main_th.redis_open_db("error", null, "redis gone");
          exit;
        }

        const dbn = _.replace(db, "db", "");

        new Promise((resolve, reject) => {
          redis.select(dbn, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
          .then((result) => {
            console.log("select", result);
            return new Promise((resolve, reject) => {
              redis.scan("0", (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            });
          })
          .then((result) => {
            this.Message.send.main_th.redis_open_db(
              "success",
              {
                db,
                result,
              },
              null
            );
          })
          .catch((error) => {
            this.Message.redis.quit();
            this.Message.redis = null;
            this.Message.send.main_th.redis_open_db("error", null, error);
            exit();
          });
      },
      redis_select_key: (db, key) => {
        console.log(
          "工作线程接开始处理 选择redis key 消息",
          db,
          key,
          "////////////////"
        );
        //console.log('EFWFQ34GQ34GQ34G',this);
        //return;
        const redis = this.Message.redis;
        if (!redis) {
          this.Message.send.main_th.redis_select_key(
            "error",
            null,
            "redis gone"
          );
          exit;
        }

        const dbn = _.replace(db, "db", "");

        new Promise((resolve, reject) => {
          redis.select(dbn, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
          .then((select_result) => {
            console.log("select", select_result);
            return new Promise((resolve, reject) => {
              redis.type(key, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            });
          })
          .then((type_result) => {
            console.log("type", type_result);
            if (type_result === "string") {
              return new Promise((resolve, reject) => {
                redis.get(key, (error, get_result) => {
                  if (error) {
                    reject(error);
                  } else {
                    //console.log('RVQERVQERG',type_result, result);
                    resolve({ type_result, get_result });
                    //resolve(result,type_result);
                  }
                });
              });
            }
          })
          .then((result) => {
            console.log("get", result);
            return new Promise((resolve, reject) => {
              redis.ttl(key, (error, ttl_result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ ...result, ttl_result });
                }
              });
            });
          })
          .then((result) => {
            console.log("ttl", result);
            this.Message.send.main_th.redis_select_key(
              "success",
              {
                db_key: db,
                key,
                result: {
                  type: result.type_result,
                  val: result.get_result,
                  ttl: result.ttl_result,
                },
              },
              null
            );
          })
          .catch((error) => {
            this.Message.redis.quit();
            this.Message.redis = null;
            this.Message.send.main_th.redis_select_key("error", null, error);
            exit();
          });
      },
      redis_update_key: (db, key_type, key, content) => {
        console.log(
          "工作线程开始处理 修改redis key 消息",
          db,
          key_type,
          key,
          content,
          "////////////////"
        );

        const redis = this.Message.redis;
        if (!redis) {
          this.Message.send.main_th.redis_select_key(
            "error",
            null,
            "redis gone"
          );
          exit;
        }

        const dbn = _.replace(db, "db", "");

        new Promise((resolve, reject) => {
          redis.select(dbn, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
          .then((select_result) => {
            console.log("select", select_result);

            if (key_type === "string") {
              return new Promise((resolve, reject) => {
                redisStringDataSet(redis, key, content, resolve, reject);
              });
            }
          })
          .then((result) => {
            console.log("set", result);
            this.Message.send.main_th.redis_update_key(
              "success",
              {
                db_key: db,
                key,
                result,
              },
              null
            );
          })
          .catch((error) => {
            this.Message.redis.quit();
            this.Message.redis = null;
            this.Message.send.main_th.redis_update_key("error", null, error);
            exit();
          });
      },
    },
  },
};
