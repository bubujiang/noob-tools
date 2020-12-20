/**
 * 主线程需要处理的消息
 * 主线程就是主进程
 * 通过workers对象和工作线程进行通信
 */

 exports.Message = {
     //worker:null,
     //setWorker:function(worker){
     //    this.worker = worker;
     //},
     onMessage:function(worker){
        worker.on('message', (message) => {
            switch (message.msg_type) {
                case 'renderer-redis-select-server':
                    this.get.worker.redis_select_server(message);
                    break;
            }
        })
     },
     get:{
         worker:{
            redis_select_server:function(result){
                console.log('worker rtn',result);

                /*if (message.rtn_type === 'error') {
                    //错误删除线程并返回错误
                    cworker.postMessage({
                        type: 'exit', //退出
                    });
                    win.webContents.send('redis-render-select-server-menu-return', message.renderer)
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
                }*/




            }
         }
     },
     send:{
         worker:{
            redis_select_server:function(conn,worker){
                worker.postMessage({
                    type: 'renderer-redis-select-server',
                    conn
                });
            }
         }
     }
 }