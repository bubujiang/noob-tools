const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')

const MainMessage = require('./ipcmsg/main.process.im.js')

let mainWindow;

const params = {
    max_len: 5,//允许的最大连接数
    sort: [],//线程活跃排序,最后使用的放最前面
    workers: {},//线程集合
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

app.on('window-all-closed', () => {
    app.quit()
})

app.on('ready', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('close-app', () => {
    app.quit()
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
 * 渲染进程测试一个服务连接
 * @param {Object} conn {host:"",port:"",auth:""} 
 */
ipcMain.handle('renderer-redis-test-conn', async (event, {host,port,auth}) => {
    console.log('主进程接收到渲染进程的 测试redis连接 消息',host,port,auth,'////////////////');
    return await MainMessage.get.renderer.redisTestConn({host,port,auth});
})