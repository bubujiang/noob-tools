/**
 * nodejs处理所有redis消息的入口
 * electron主进程使用
 */

const MSGS = require('./../config.json').MSGS;
const _ = require('lodash');
const mkRes = (level,msg,ext={})=>{
    return {module:'redis',level,msg,data:ext};
}
const getConnectParams = ({host,port,auth,name,cluster,tls,ssh})=>{
    let params = {
        host,
        port,
        name,
        cluster:Boolean(cluster),
        auth:'',
        tls:{},
        ssh:{}
    };

    if(auth){
        params.auth = auth;
    }

    if(_.isObject(tls) && _.hasIn(tls, 'private_key')){
        params.tls.private_key = tls.private_key;
    }
    if(_.isObject(tls) && _.hasIn(tls, 'public_key')){
        params.tls.public_key = tls.public_key;
    }
    if(_.isObject(tls) && _.hasIn(tls, 'authority')){
        params.tls.authority = tls.authority;
    }

    if(_.isObject(ssh) && _.hasIn(ssh, 'host')){
        params.ssh.host = ssh.host;
    }
    if(_.isObject(ssh) && _.hasIn(ssh, 'port')){
        params.ssh.port = ssh.port;
    }
    if(_.isObject(ssh) && _.hasIn(ssh, 'user')){
        params.ssh.user = ssh.user;
    }
    if(_.isObject(ssh) && _.hasIn(ssh, 'pwd')){
        params.ssh.pwd = ssh.pwd;
    }
    if(_.isObject(ssh) && _.hasIn(ssh, 'private_key')){
        params.ssh.private_key = ssh.private_key;
    }
    if(_.isObject(ssh) && _.hasIn(ssh, 'passphrase')){
        params.ssh.passphrase = ssh.passphrase;
    }
    if(_.isObject(ssh) && _.hasIn(ssh, 'timeout')){
        params.ssh.timeout = ssh.timeout;
    }

    return params;
}

module.exports = {
    /**
     * electron主进程要监听的所有消息
     * @param {{}} ipcMain 
     */
    register(ipcMain){
        for(const k in MSGS){
            const msg = MSGS[k];
            if(msg.is_sync){
                ipcMain.handle(msg['name'], async (event, params) => {
                    console.log('消息：'+msg.desc+'被接收到！');
                    return await this[msg['name']].get.call(this[msg['name']],params);
                })
            }else{
                ipcMain.on(msg['name'], (event, params) => {
                    console.log('消息：'+msg.desc+'被接收到！');
                    return this[msg['name']].get.call(this[msg['name']],params);
                })
            }
        }
    },
    [MSGS.TEST.name]: {
        async get({host,port,auth,name,cluster,tls,ssh}) {
            console.log('消息：'+MSGS.TEST.desc+'处理参数开始！',{host,port,auth,name,cluster,tls,ssh});
            //检测参数、清理参数\默认参数
            if(!(_.isString(host) && !_.isEmpty(host))){
                const res = mkRes('err','$$host err');
                this.response(res);
                return;
            }
            if(!(_.isNumber(port) && !_.isEmpty(port))){
                const res = mkRes('err','$$port err');
                this.response(res);
                return;
            }
            if(!(_.isString(name) && !_.isEmpty(name))){
                const res = mkRes('err','$$name err');
                this.response(res);
                return;
            }
            const params = getConnectParams({host,port,auth,name,cluster,tls,ssh});
            console.log('消息：'+MSGS.TEST.desc+'处理参数结束！',params);
            
            this.work(params);
        },
        work(params){
            console.log('消息：'+MSGS.TEST.desc+'处理开始！',params);
            MReids.create(params);
            MReids.test().then((res)=>{
                this.response(res);
            }).catch((res)=>{
                this.response(res);
            });
            console.log('消息：'+MSGS.TEST.desc+'处理结束！');
        },
        response(res) {}
    },
    [MSGS.CREATE.name]: {
        get() {
            console.log('消息：'+MSGS.CREATE.desc+'处理开始！');
            console.log('消息：'+MSGS.CREATE.desc+'处理结束！');
        },
        response() {}
    }
}