const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')

const {
    Message
} = require('./../message/main.process.msg');

const path = require('path')
const os = require('os')

let mainWindow;

const important = {
    max_len: 5,//允许的最大连接数
    sort: [],//线程活跃排序,最后使用的放最前面
    workers: {},//线程集合
    //redises: {}//redis连接对象集合
}

function createWindow() {
    Menu.setApplicationMenu(null)
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    mainWindow.loadFile('./dist/index.html')

    mainWindow.webContents.openDevTools()
}

/*app.whenReady().then(async ()=>{
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }

    const { default: installExtension, } = require('electron-devtools-installer')
      // 使用beta版 vue-devtools
      // 参考链接 https://github.com/vuejs/vue-devtools/issues/1279
      // https://v3.vuejs.org/guide/migration/introduction.html#devtools-extension
      // https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg
      var vue_devtools_beta = { id: "ljjemllljcmogpfapbkkighbhhppjdbg", electron: ">=10.1.5" }
      var result = await installExtension(vue_devtools_beta)



    //BrowserWindow.addDevToolsExtension(
        //path.join(os.homedir(), '/.config/google-chrome/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.2_0')
     //   path.join(os.homedir(), '/.config/google-chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.3.3_0')
     //)
})*/

app.on('window-all-closed', () => {
    //if (process.platform !== 'darwin') {
    app.quit()
    //process.exit();
    //}
})

app.on('ready', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('close-app', () => {
    //if (process.platform !== 'darwin') {
    app.quit()
    //process.exit();
    //}
})

ipcMain.on('min-app', e => mainWindow.minimize())

ipcMain.on('toggle-app', e => {
    if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false)
    } else {
        mainWindow.setFullScreen(true)
    }
})

/**
 * 渲染进程选择一个服务连接
 * @param {Object} conn {host:"",port:"",auth:""} 
 */
ipcMain.on('renderer-redis-select-server', (event, conn) => {
    console.log('start', conn, '/////////////////////////');
    return Message.get.renderer.redis_select_server(conn, mainWindow, important);
});

/**
 * 渲染进程打开一个数据库db
 * @param {Object} params {host:"",port:"",db:""} l
 */
ipcMain.on('renderer-redis-open-db',(event,params)=>{
    console.log('主进程接收到 打开redis数据库 消息', params, '///////////////');
    return Message.get.renderer.redis_open_db(params, mainWindow, important);
});

/**
 * 渲染进程选择一个redis key
 * @param {Object} params {host:"",port:"",db_k:"",key:""}
 */
ipcMain.on('renderer-redis-select-key',(event,params)=>{
    console.log('主进程收到 选择redis key 消息', params, '///////////////');
    return Message.get.renderer.redis_select_key(params, mainWindow, important);
});

/**
 * 渲染进程修改一个redis key
 * @param {Object} params {host:"",port:"",db_key:"",key:""}
 */
ipcMain.on('renderer-redis-update-key',(event,params)=>{
    console.log('主进程收到 修改redis key 消息', params, '///////////////');
    return Message.get.renderer.redis_update_key(params, mainWindow, important);
});

/**
 * 渲染进程测试一个服务连接
 * @param {Object} conn {host:"",port:"",auth:""} 
 */
ipcMain.handle('renderer-redis-test-conn', async (event, conn) => {
    return await Message.get.renderer.redis_test_server(conn);
})