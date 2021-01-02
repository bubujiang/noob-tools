const { exists } = require("fs");
const { exit } = require("process");

module.exports = {
  redis: null,
  onMessage() {
    parentPort.on("message", (message) => {
      switch (message.type) {
        case "renderer-redis-select-conn":
          console.log(
            "工作线程接收到 选择redis连接 消息",
            conn,
            "////////////////"
          );
          this.get.main.redisSelectConn(message.conn);
          break;
        default:
          exit();
      }
    });
  },

  get:{
      main:{
        redisSelectConn({host,port,auth}){
            
        }
      }
  }
};
