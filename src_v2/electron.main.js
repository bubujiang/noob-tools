const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')

const RedisMsg =  require('./method/msg.redis.cjs.js');

let mainWindow;

const params = {
    max_len: 5, //允许的最大连接数
    sort: [], //线程活跃排序,最后使用的放最前面
    workers: {}, //线程集合
}

app.on('ready', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
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
})

app.on('window-all-closed', () => {
    app.quit()
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

RedisMsg.register(ipcMain);