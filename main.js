const { app, BrowserWindow } = require('electron')
const { setMainMenu } = require('./menu.js')

const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  // win.setMenuBarVisibility(false) // Ocultar Menu superior de herramientas de la ventana
  setMainMenu(mainWindow)
}

app.whenReady().then(() => {
  createWindow()
})

// Asegurarse de terminar el proceso al cerrar la ventana del programa
app.on('window-all-closed', () => {
// Darwin => MacOS / Win32 => Windows / Linux => Linux
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
