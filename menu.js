const { Menu, dialog } = require('electron')

const setMainMenu = (mainWindow) => {
  const template = [
    {
      label: 'My App',
      submenu: [
        {
          label: 'Message Box',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              title: 'My Message Box',
              message: 'This is an example message for a Message Box',
              buttons: ['Accept'],
              textWidth: 20,
              detail: 'Dolore cupidatat laboris eu excepteur ea voluptate magna sunt ad.'
            })
          }
        },
        {
          label: 'Open File',
          click: () => {
            dialog.showOpenDialog(mainWindow, {
              filters: [
                {
                  name: 'PDFs',
                  extensions: ['pdf']
                }
              ],
              title: 'Select a PDF File',
              defaultPath: __dirname,
              properties: ['openFile']
            }).then(result => {
              console.log('canceled? ' + result.canceled)
              console.log(result.filePaths)
            }).catch(err => {
              console.log(err)
            })
            // Continuar procesado con: ReadFile -> del FileSystem de Node
          }
        },
        { type: 'separator' },
        { role: 'about' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Themes',
      submenu: [
        {
          label: 'Light',
          click: () => mainWindow.webContents.send('update-theme', 'light')
        },
        { type: 'separator' },
        {
          label: 'Dark',
          click: () => mainWindow.webContents.send('update-theme', 'Dark')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

module.exports = {
  setMainMenu
}
