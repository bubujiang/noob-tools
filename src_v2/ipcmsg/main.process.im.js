const MRedis = require("./../method/redis.m.js");
const MMethod = require("./../method/main.process.m.js");
const _ = require("lodash");
const {
    Worker
  } = require('worker_threads');

module.exports = {
    wokerOnMessage(worker,win,{ host, port, auth }){},
  get: {
    renderer: {
      async redisTestConn({ host, port, auth }) {
        console.log(
          "主进程开始处理渲染进程的 测试redis连接 消息",
          host,
          port,
          auth,
          "////////////////"
        );
        return await MRedis.createRedisConnect({
          host,
          port,
          auth,
        })
          .then((client) => {
            client.quit();
            return MMethod.makeRendererResponseMsg(
              "redis",
              "success",
              "$$连接成功!"
            );
          })
          .catch((error) => {
            return MMethod.makeRendererResponseMsg(
              "redis",
              "error",
              error.message
            );
          });
      },
      selectRedisConn(win, params, { host, port, auth }) {
        console.log(
          "主进程开始处理渲染进程的 选择redis连接 消息",
          host,
          port,
          auth,
          "////////////////"
        );
        //
        const workers = params.workers;
        const sort_worers = params.sort;
        const max_len = params.max_len;
        const key = params.host + ":" + conn.port;
        //
        //////////////////////////新建线程
        let worker;
        if (_.hasIn(workers, key)) {
          //console.log('worker exsit', conn, '/////////////////////////');
          //存在重排
          worker = workers[key];
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          //存在此线程就必然有redis连接
          //redis = redises[key];
          //console.log('worker exsit after', conn, important, '/////////////////////////');
        } else {
          //console.log('worker not', conn, '/////////////////////////');
          //不存在新建
          worker = new Worker("./src/worker/redis.worker.js");
          workers[key] = worker;
          //console.log('worker not after', conn, important, '/////////////////////////');
          /////////////////////////监听线程消息
          this.wokerOnMessage(worker,win,{ host, port, auth });//get.worker.onMessage(worker, win, important, conn);
        }
        //线程排序
        sort_worers.unshift(key);
        //超过就弹出最后一个
        if (sort_worers.length > max_len) {
            //console.log('worker more', conn, '/////////////////////////');
            const rkey = sort_worers.pop();
            this.Message.send.worker.quit();
            //redises[rkey].quit();
            delete workers[rkey];
            //delete redises[rkey];
            //console.log('worker more after', conn, important, '/////////////////////////');
          }
          //线程内相关操作
        this.send.worker.redisSelectConn(worker,{ host, port, auth });

      },
    },
    worker:{
        //onMessage(){},
    }
  },
  send: {
    renderer: {
      //redisTestConn(){}
    },
    worker:{
        redisSelectConn(worker,{ host, port, auth }){
            console.log(
                "主进程发送 选择redis连接 消息 到 工作线程",
                host,
                port,
                auth,
                "////////////////"
              );
              worker.postMessage({
                type: 'renderer-redis-select-conn',
                conn:{ host, port, auth }
              });
        }
    }
  },
};
