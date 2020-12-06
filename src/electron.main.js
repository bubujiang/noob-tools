const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')
const {
    Worker,MessageChannel
} = require('worker_threads');
const _ = require('lodash');
//const { delete, delete } = require('vue/types/umd');

let mainWindow;
const allow_max_worker_len = 5;
let current_worker_no = 0;
const workers = {};

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
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('close-app', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('min-app', e => mainWindow.minimize())

/**
 * mkredth 创建线程并连接/进重连
 * clsredth 退出线程并关闭连接
 * tsconn 测试连接
 * command 各种redis操作指令
 */
ipcMain.on('mkredth', (e,conn) => {
    console.log('//////////////');
    const key = conn.host + ':' + conn.port;
    let cworker;
    if(_.hasIn(workers, key)){
        cworker = workers[key];
    }
    else{
        cworker = new Worker('./src/worker/redis.worker.js');
        workers[key] = cworker;
    }
    cworker.postMessage({type:'connect','conn':conn});
    console.log('main proc')

    let keys = _.keys(workers);
    if(keys.length > allow_max_worker_len){
        console.log('more then 5');
        workers[keys[0]].postMessage('exit');
        delete workers[keys[0]];
    }

    delete keys;
})

ipcMain.on('tsconn', (e,conn) => {
    console.log('tsconn start');
    console.log('params',conn);
    
})