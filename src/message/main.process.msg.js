/**
 * electron主进程需处理的消息
 */

const {
  createRedisClient,
  makeRendererResponseMsg,
} = require("./../method/redis.main.js");
const _ = require("lodash");
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
      redis_select_server:(conn, win, important)=>{
        console.log('main process start', conn, important, '/////////////////////////');

        const workers = important.workers;
        const sort_worers = important.sort;
        //const redises = important.redises;
        const max_len = important.max_len;
        const key = conn.host + ":" + conn.port;
        //////////////////////////新建线程
        let worker;
        //let redis;
        if (_.hasIn(workers, key)) {
          console.log('worker exsit', conn, '/////////////////////////');
          //存在重排
          worker = workers[key];
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          //存在此线程就必然有redis连接
          //redis = redises[key];
          console.log('worker exsit after', conn, important, '/////////////////////////');
        } else {
          console.log('worker not', conn, '/////////////////////////');
          //不存在新建
          worker = new Worker("./src/worker/redis.worker.js");
          workers[key] = worker;
          console.log('worker not after', conn, important, '/////////////////////////');
          /////////////////////////监听线程消息
          this.Message.get.worker.onMessage(worker,win,important,key);
        }
        //线程排序
        sort_worers.unshift(key);

        console.log('worker sort', conn, important, '/////////////////////////');
        //超过就弹出最后一个
        if(sort_worers.length > max_len){
          console.log('worker more', conn, '/////////////////////////');
          const rkey = sort_worers.pop();
          this.Message.send.worker.quit();
          //redises[rkey].quit();
          delete workers[rkey];
          //delete redises[rkey];
          console.log('worker more after', conn, important, '/////////////////////////');
        }
        console.log('main process end', conn, important, '/////////////////////////');
        //线程内相关操作
        this.Message.send.worker.redis_select_server(conn,worker);
      },
    },
    worker:{
      onMessage:(worker,win,important,key)=>{
        worker.on('message', (message) => {
          switch (message.msg_type) {
              case 'renderer-redis-select-server':
                  this.Message.get.worker.redis_select_server(message,win,important,key);
                  break;
          }
        })
      },
      redis_select_server:function(message,win,important,key){
        const workers = important.workers;
        const sort_worers = important.sort;
        //const redises = important.redises;

        console.log('worker rtn',message,'///////////////////');
        //执行出错
        if (message.rtn_type === 'error') {
            //返回错误
            win.webContents.send('renderer-redis-select-server', makeRendererResponseMsg('redis','error',message.error.message))
            //删除
            for (const k in sort_worers) {
                if (sort_worers[k] === key) {
                    sort_worers.splice(k, 1);
                }
            }
            delete workers[key];
        } else {
            //返回成功消息并添加到redis集合
            win.webContents.send('renderer-redis-select-server', makeRendererResponseMsg('redis','sucess','',{info:message.info}))
            //redises[key] = message.redis
        }
        console.log('worker rtn after',message,important,'///////////////////');
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
      },
      quit:function(worker){
        worker.postMessage({
            type: 'quit'
        });
      }
    }
  },
};
