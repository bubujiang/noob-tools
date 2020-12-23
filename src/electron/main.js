const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')

const {
    Message
} = require('./../message/main.process.msg');

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

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    //if (process.platform !== 'darwin') {
    app.quit()
    //process.exit();
    //}
})

app.on('activate', () => {
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
 * 渲染进程测试一个服务连接
 * @param {Object} conn {host:"",port:"",auth:""} 
 */
ipcMain.handle('renderer-redis-test-conn', async (event, conn) => {
    return await Message.get.renderer.redis_test_server(conn);
})