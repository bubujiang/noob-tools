const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')
const {
    redisSelectServerMenu,
    redisTestConn,
} = require('./redis.ipc.js');

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
ipcMain.on('redis-render-select-server-menu', (event, conn) => {
    return redisSelectServerMenu.call(this, conn, workers);
});

/**
 * 渲染进程测试一个服务连接
 * @param {Object} conn {host:"",port:"",auth:"",name:""} 
 */
ipcMain.handle('redis-render-test-conn', async (event, conn) => {
    return await redisTestConn.call(this, conn);
})