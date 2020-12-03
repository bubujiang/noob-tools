const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron')
var path = require("path")
let mainWindow;

function createWindow() {
    //const Menu = electron.Menu
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

    //console.log(path.dirname(path.dirname(path.dirname(__filename)))+'/dist/electron.html');
    //win.loadURL(`file://${path.dirname(path.dirname(path.dirname(__filename)))}/dist/electron.html`);
    mainWindow.loadURL(`file://${path.dirname(path.dirname(__filename))}/dist/index.html`);
    //win.loadFile('index.html')
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