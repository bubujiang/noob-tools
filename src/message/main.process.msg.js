/**
 * electron主进程需处理的消息
 */

const {
  createRedisClient,
  makeRendererResponseMsg,
} = require("./../method/redis.main.js");
const _ = require("lodash");
//const {
//  Message
//} = require('./../message/main.thread.msg.js');
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
      redis_select_server:(conn, workers, sort_worers, redis_clients)=>{
        console.log('main process start',conn, workers, sort_worers, redis_clients);
        const key = conn.host + ":" + conn.port;
        //////////////////////////新建线程
        let worker;
        let redis;
        if (_.hasIn(workers, key)) {
          //存在重排
          worker = workers[key];
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          //存在此线程就必然有redis连接
          redis = redis_clients[key];
        } else {
          //不存在新建
          worker = new Worker("./src/worker/redis.worker.js",{workerData:{redis}});
          workers[key] = worker;
          /////////////////////////监听线程消息
          //console.log('kjbklugliubvuvuyvuyv',this);
          this.Message.get.worker.onMessage(worker);
        }
        //线程排序
        sort_worers.unshift(key);
        console.log('main process end', workers, sort_worers, redis_clients);
        //线程内相关操作
        this.Message.send.worker.redis_select_server(conn,worker);
        //发送消息给渲染进程
      },
    },
    worker:{
      onMessage:(worker)=>{
        worker.on('message', (message) => {
          switch (message.msg_type) {
              case 'renderer-redis-select-server':
                //console.log('WEFQWF4QE5GRW46H357J',this);
                  this.Message.get.worker.redis_select_server(message);
                  break;
          }
        })
      },
      redis_select_server:function(message){
        //执行出错
        if (message.rtn_type === 'error') {
            //错误删除线程并返回错误
            //cworker.postMessage({
            //    type: 'exit', //退出
            //});
            win.webContents.send('redis-render-select-server', message.renderer)
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
        //console.log('worker rtn',message);
      }
    }
  },
  send: {
    worker:{
      redis_select_server:function(conn,worker){
        worker.postMessage({
            type: 'renderer-redis-select-server',
            conn
        });
      }
    }
  },
};
