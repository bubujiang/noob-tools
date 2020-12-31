const { Promise } = require("es6-promise");

const ipcRenderer = window['require']('electron').ipcRenderer;

module.exports = {
    send: {
        main: {
            redisTestConn({
                host,
                port,
                auth
            }) {
                console.log('渲染进程的发送 测试redis连接 消息',host,port,auth,'////////////////');
                return ipcRenderer.invoke('renderer-redis-test-conn', {
                        host,
                        port,
                        auth
                    });
            }
        }
    },
    get: {}
}