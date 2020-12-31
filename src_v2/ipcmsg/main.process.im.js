const MRedis = require('./../method/redis.m.js');
const MMethod = require('./../method/main.process.m.js');

module.exports = {
    get: {
        renderer: {
            async redisTestConn({
                host,
                port,
                auth
            }) {
                console.log('主进程开始处理渲染进程的 测试redis连接 消息',host,port,auth,'////////////////');
                return await MRedis.createRedisConnect({
                        host,
                        port,
                        auth
                    })
                    .then((client) => {
                        client.quit();
                        return MMethod.makeRendererResponseMsg("redis", "success", "$$连接成功!");
                    })
                    .catch((error) => {
                        return MMethod.makeRendererResponseMsg("redis", "error", error.message);
                    });
            }
        }
    },
    send: {
        renderer:{
            //redisTestConn(){}
        }
    }
}