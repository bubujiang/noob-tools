const { app, BrowserWindow } = require('electron')
var path = require("path")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule :true
    }
  })

  //console.log(path.dirname(path.dirname(path.dirname(__filename)))+'/dist/electron.html');
  //win.loadURL(`file://${path.dirname(path.dirname(path.dirname(__filename)))}/dist/electron.html`);
  win.loadURL(`file://${path.dirname(path.dirname(path.dirname(__filename)))}/dist/index.html`);
  //win.loadFile('index.html')
  win.webContents.openDevTools()
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