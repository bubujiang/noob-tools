const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')
const {
    Worker
} = require('worker_threads');
const _ = require('lodash');

let mainWindow;
const max_worker_num = 5;
const worker_queue = [];

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
    
    const file_path = './src/worker/redis.worker.js';
    const worker = new Worker(file_path);
    worker_queue.unshift(worker);
    console.log(worker)

    if(worker_queue.length > max_worker_num){
        worker_queue.pop();
    }
    
})