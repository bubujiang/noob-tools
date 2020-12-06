/**
 * connect
 * command
 * exit
 */
const { exit } = require('process');
const { parentPort } = require('worker_threads');

function connect(conn){
    console.log('connect',conn);
}

function command(comm){
    console.log('command',comm);
}

parentPort.on('message', (message) => {
    switch (message.type) {
        case 'connect':
            connect.call(this,message.conn);
            break;
        case 'command':
            command.call(this,message.comm);
            break;
        default:
            console.log('exit');
            exit;
            break;
    }
});

