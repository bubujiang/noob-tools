/**
 * nodejs处理所有redis消息的入口
 * electron主进程使用
 */

const MSGS = require('./../config.json').MSGS;
const _ = require('lodash');
const { electron } = require('webpack');
const mkRes = (level,msg,ext={})=>{
    return {module:'redis',level,msg,data:ext};
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
        async get({host,port,auth,name,cluster,tsl,ssh}) {
            console.log('消息：'+MSGS.TEST.desc+'处理参数开始！');
            //检测参数、清理参数
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
            let params = {host,port,name,cluster:Boolean(cluster)};
            if(!_.isEmpty(auth)){
                params.auth = auth;
            }
            console.log('消息：'+MSGS.TEST.desc+'处理参数结束！');
            
            this.work();
        },
        work(){
            console.log('消息：'+MSGS.TEST.desc+'处理开始！');
            MReids.create();
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