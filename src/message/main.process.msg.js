/**
 * electron主进程需处理的消息
 */

const {
  createRedisClient,
  makeRendererResponseMsg,
} = require("./../method/redis.main.js");
const _ = require("lodash");
const {
  Worker
} = require('worker_threads');

exports.Message = {
  get: {
    renderer: {
      //electron渲染进程
      redis_test_server: async function (conn) {
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
      redis_select_server: (conn, win, important) => {
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
          this.Message.get.worker.onMessage(worker, win, important, conn);
        }
        //线程排序
        sort_worers.unshift(key);

        console.log('worker sort', conn, important, '/////////////////////////');
        //超过就弹出最后一个
        if (sort_worers.length > max_len) {
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
        this.Message.send.worker.redis_select_server(conn, worker);
      },
      redis_open_db: (params, win, important) => {
        console.log('主进程开始处理 打开redis数据库 消息', params, '//////////////////');
        //向对应worker发消息
        const workers = important.workers;
        const key = params.host + ":" + params.port;
        const worker = workers[key];
        this.Message.send.worker.redis_open_db(params.db, worker);
      },
      redis_select_key: (params, win, important) => {
        console.log('主进程开始处理 选择redis key 消息', params, '//////////////////');
        //向对应worker发消息
        const workers = important.workers;
        const server_key = params.host + ":" + params.port;
        const db_key = params.db_k;
        const key = params.key;
        const worker = workers[server_key];
        this.Message.send.worker.redis_select_key(db_key, key, worker);
      },
      redis_update_key: (params, win, important) => {
        console.log('主进程开始处理 修改redis key 消息', params, '//////////////////');
        //向对应worker发消息
        const workers = important.workers;
        const server_key = params.host + ":" + params.port;
        const db_key = params.db_key;
        const key_type = params.key_type;
        const key = params.key;
        const content = params.content;
        const worker = workers[server_key];
        console.log('主进程发送 修改redis key 消息', db_key, key_type, key, content, '//////////////////');
        this.Message.send.worker.redis_update_key(db_key, key_type, key, content, worker);
      }
    },
    worker: {
      onMessage: (worker, win, important, conn) => {
        worker.on('message', (message) => {
          switch (message.msg_type) {
            case 'renderer-redis-select-server':
              this.Message.get.worker.redis_select_server(message, win, important, conn);
              break;
            case 'renderer-redis-open-db':
              this.Message.get.worker.redis_open_db(message, win, important, conn);
              break;
            case 'renderer-redis-select-key':
              this.Message.get.worker.redis_select_key(message, win, important, conn);
              break;
          case 'renderer-redis-update-key':
            this.Message.get.worker.redis_update_key(message, win, important, conn);
          break;
            }
        })
      },
      redis_select_server: function (message, win, important, conn) {
        const key = conn.host + ":" + conn.port;
        const workers = important.workers;
        const sort_worers = important.sort;
        //const redises = important.redises;

        console.log('worker rtn', message, '///////////////////');
        //执行出错
        if (message.rtn_type === 'error') {
          //返回错误
          win.webContents.send('renderer-redis-select-server', makeRendererResponseMsg('redis', 'error', message.error.message, {
            menu: conn
          }))
          //删除
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          delete workers[key];
        } else {
          //返回成功消息并添加到redis集合
          win.webContents.send('renderer-redis-select-server', makeRendererResponseMsg('redis', 'sucess', '', {
            info: message.info,
            menu: conn
          }))
          //redises[key] = message.redis
        }
        console.log('worker rtn after', message, important, '///////////////////');
      },
      redis_open_db: function (message, win, important, conn) {
        const key = conn.host + ":" + conn.port;
        const workers = important.workers;
        const sort_worers = important.sort;
        if (message.rtn_type === 'error') {
          //返回错误
          win.webContents.send('renderer-redis-open-db', makeRendererResponseMsg('redis', 'error', message.error.message, {
            menu: conn
          }))
          //删除
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          delete workers[key];
        } else {
          //返回成功消息并添加到redis集合
          win.webContents.send('renderer-redis-open-db', makeRendererResponseMsg('redis', 'sucess', '', {
            info: message.info,
            menu: conn
          }))
          //redises[key] = message.redis
        }
      },
      redis_select_key: function (message, win, important, conn) {
        console.log('主进程开始处理 选择redis key 返回消息', message, conn, '//////////////////');
        const key = conn.host + ":" + conn.port;
        const workers = important.workers;
        const sort_worers = important.sort;
        if (message.rtn_type === 'error') {
          //返回错误
          win.webContents.send('renderer-redis-select-key', makeRendererResponseMsg('redis', 'error', message.error.message, {
            menu: conn
          }))
          //删除
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          delete workers[key];
        } else {
          //返回成功消息并添加到redis集合
          win.webContents.send('renderer-redis-select-key', makeRendererResponseMsg('redis', 'sucess', '', {
            info: message.info.result,
            db_key: message.info.db_key,
            key: message.info.key,
            menu: conn
          }))
          //redises[key] = message.redis
        }
      },
      redis_update_key:function (message, win, important, conn) {
        console.log('主进程开始处理 修改redis key 返回消息', message, conn, '//////////////////');
        const key = conn.host + ":" + conn.port;
        const workers = important.workers;
        const sort_worers = important.sort;
        if (message.rtn_type === 'error') {
          //返回错误
          win.webContents.send('renderer-redis-update-key', makeRendererResponseMsg('redis', 'error', message.error.message, {
            menu: conn
          }))
          //删除
          for (const k in sort_worers) {
            if (sort_worers[k] === key) {
              sort_worers.splice(k, 1);
            }
          }
          delete workers[key];
        } else {
          //返回成功消息并添加到redis集合
          win.webContents.send('renderer-redis-update-key', makeRendererResponseMsg('redis', 'sucess', '', {
            info: message.info.result,
            db_key: message.info.db_key,
            key: message.info.key,
            menu: conn
          }))
          //redises[key] = message.redis
        }
      },
    }
  },
  send: {
    worker: {
      redis_select_server: function (conn, worker) {
        worker.postMessage({
          type: 'renderer-redis-select-server',
          conn
        });
      },
      redis_open_db: function (db, worker) {
        console.log('主进程发送 打开redis数据库 消息 到 工作线程', db, '////////////////');
        worker.postMessage({
          type: 'renderer-redis-open-db',
          db
        });
      },
      redis_select_key: function (db_key, key, worker) {
        console.log('主进程发送 选择redis key 消息 到 工作线程', db_key, key, '////////////////');
        worker.postMessage({
          type: 'renderer-redis-select-key',
          db_key,
          key
        });
      },
      redis_update_key: function (db_key, key_type, key, content, worker) {
        console.log('主进程发送 修改redis key 消息', db_key, key_type, key, content, '//////////////////');
        worker.postMessage({
          type: 'renderer-redis-update-key',
          db_key,
          key, key_type,content
        });
      },
      quit: function (worker) {
        worker.postMessage({
          type: 'quit'
        });
      }
    }
  },
};