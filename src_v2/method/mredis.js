const Redis = require("ioredis");
const _ = require("lodash");
const fs = require('fs');

const private = {
    createClusterClient({host,port,auth,tls,ssh}){
        //const option = this.getOption({host,port,auth,tls,ssh});
        new Redis.Cluster();
    },
    createStandardClient({host,port,auth,tls,ssh}){
        const options = this.getRedisOptions.call(this,{auth,tls});
        if(!_.isEmpty(ssh)){}
        return new Redis(port, host, options);
    },
    getRedisOptions({auth,tls}){
        return {
            connectTimeout: 30000,
            //retryStrategy: (times) => {return this.retryStragety(times, {host, port})},
            enableReadyCheck: false,
            password: auth,
            tls: _.isEmpty(tls) ? undefined : this.getTLSOptions(tls)
        };
    },
    getTLSOptions(options) {
        return {
            ca: options.ca ? fs.readFileSync(options.ca) : '',
            key: options.key ? fs.readFileSync(options.key) : '',
            cert: options.cert ? fs.readFileSync(options.cert) : '',
            checkServerIdentity: (servername, cert) => {
                // skip certificate hostname validation
                return undefined;
            },
            rejectUnauthorized: false,
        }
    },
    getSSHOptions(options){
        return {
            username: options.user,
            password: options.pwd,
            host: options.host,
            port: options.port,
            readyTimeout: (options.timeout) > 0 ? (options.timeout * 1000) : 30000,
            dstHost: host,
            dstPort: port,
            localHost: '127.0.0.1',
            localPort: null, // set null to use available port in local machine
            privateKey: options.private_key ? fs.readFileSync(options.private_key) : undefined,
            passphrase: options.passphrase ? options.passphrase : undefined,
            keepaliveInterval: 10000
        };
    }
}

//const getNatMap = ()=>{}

module.exports = {
    redis:null,
    create({host,port,auth,cluster,tls,ssh}){
        if(cluster){
            this.redis = private.createClusterClient.call(private,{host,port,auth,tls,ssh});
        }else{
            this.redis = private.createStandardClient.call(private,{host,port,auth,tls,ssh});
        }
    },
    test(){},

}