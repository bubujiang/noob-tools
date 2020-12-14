const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')

//const {redisTestConn,redisMakeThread} = require('./redis.ipc.js')
const {
    redisSelectedServerMenu,
    redisTestConn
} = require('./redis.ipc.js')

let mainWindow;
const allow_max_worker_len = 5; //允许的最大连接数
const sort_worers = []; //线程活跃排序,最后使用的放最前面
const workers = {}; //线程集合
const redis_clients = {}; //redis连接对象集合

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
 * @param {Object} conn {host:"",port:"",auth:"",name:""} 
 */
ipcMain.on('redis-render-selected-server-menu', (event, conn) => {
    redisSelectedServerMenu.call(this, conn);
});

/**
 * 渲染进程测试一个服务连接
 * @param {Object} conn {host:"",port:"",auth:"",name:""} 
 */
ipcMain.handle('redis-render-test-conn', async (event, conn) => {
    return await redisTestConn.call(this, conn);
})

ipcMain.on('redis-make-thread', (e, conn) => {
    redisMakeThread.call(this, e, conn, workers, redis_clients, sort_worers, allow_max_worker_len);
    //console.log('sort_worers',sort_worers,key);
    //添加空的servers_tab并切换标签
    //mainWindow.webContents.send('redis-add-server-tabs-and-change-selected-tab', conn)
    //取得数据返回给渲染进程并修改servers_menu标绿
    //
    //mainWindow.webContents.send('redis-change-selected-tab', 'whoooooooh!')
    //
})