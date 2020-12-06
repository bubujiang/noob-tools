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

ipcMain.on('mkredth', (e) => {
    console.log('//////////////');
    //const file_path = './src/worker/redis.worker.js';
    const worker = new Worker('./src/worker/redis.worker.js');
    //++current_worker_no;
    workers[++current_worker_no] = worker

    //worker_queue.unshift(worker);
    //const subChannel = new MessageChannel();
    worker.postMessage({init:'test message'+current_worker_no});
    console.log('main proc')

    let keys = _.keys(workers);

    if(keys.length > allow_max_worker_len){
        console.log('more then 5');
        workers[keys[0]].postMessage('exit'+keys[0]);
        delete workers[keys[0]];
    }

    delete keys;
})