const { parentPort } = require('worker_threads');

parentPort.on('message', (message) => {
    console.log(message);
    //parentPort.postMessage(message);
});