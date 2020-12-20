/**
 * electron主进程需处理的消息
 */

const {
  createRedisClient,
  makeRendererResponseMsg,
} = require("./../method/redis.main.js");
const _ = require("lodash");
const {
  Message
} = require('./../message/main.thread.msg.js');
const {
  Worker,
  ipcMain
} = require('worker_threads');

exports.Message = {
  get: {
    renderer: {
      //electron渲染进程
      redis_test_server: async function(conn) {
        //渲染进程测试连接
        const prom = ((params) => {
          return new Promise((resolve, reject) => {
            createRedisClient(params, resolve, reject);
          });
        })(conn);

        return await prom
          .then((client) => {
            client.quit();
            return makeRendererResponseMsg("redis", "success", "连接成功!");
          })
          .catch((error) => {
            return makeRendererResponseMsg("redis", "error", error.message);
          });
      },
      redis_select_server: function(conn, workers, sort_worers, redis_clients) {
        console.log('main process start',conn, workers, sort_worers, redis_clients);
        const key = conn.host + ":" + conn.port;
        //////////////////////////新建线程
        let worker;
        let redis;
        //let message = Message;
        if (_.hasIn(workers, key)) {
          //存在重排
          worker = workers[key];
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          //message.setWorker(worker);
          //存在此线程就必然有redis连接
          redis = redis_clients[key];
        } else {
          //不存在新建
          worker = new Worker("./src/worker/redis.worker.js",{workerData:{redis}});
          workers[key] = worker;
          /////////////////////////监听线程消息
          //message.setWorker(worker);
          Message.onMessage(worker);
        }
        //线程排序
        sort_worers.unshift(key);
        console.log('main process end', workers, sort_worers, redis_clients);
        //线程内相关操作
        Message.send.worker.redis_select_server(conn,worker);
        //msg
        //worker.postMessage({
        //    type: 'redis-select-server',
            //conn
        //});
        //发送消息给渲染进程
      },
    },
  },
  send: {},
};
