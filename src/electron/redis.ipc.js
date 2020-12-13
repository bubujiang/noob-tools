/**
 * redis-test-conn
 * redis-make-thread
 */
const redis = require("redis");

async function testConn(e, conn){
    console.log('redis-test-conn start');
    console.log('params', conn);

    delete conn.name;

    console.log('c params',conn);

    let prom = new Promise((resolve, reject) => {
        const client = redis.createClient(conn);

        client.on("ready", function () {
            client.quit();
            resolve();
        });

        client.on("error", function (error) {
            reject(error);
        });
    });

    return await prom.then(()=>{
        return {
            type: 'success'
        };
    }).catch((error)=>{
        return {
            type: 'error',
            info: error
        };
    });
 }

 exports.redisTestConn = testConn