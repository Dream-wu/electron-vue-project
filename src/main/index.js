'use strict'

import { app, BrowserWindow, ipcMain, dialog, Tray, globalShortcut } from 'electron'
let path = require('path')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    // backgroundColor: '#ffff00',
    width: 1000,
    // frame: false, // 去掉默认的标题栏
    webPreferences: {
      webviewTag: true,
      webSecurity: false // 此窗口禁用当前窗口的同源策略
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('close', e => {
    dialog.showMessageBox(
      {
        type: 'info',
        title: 'Information',
        defaultId: 0,
        message: '确定要关闭吗？',
        buttons: ['最小化', '直接退出']
      },
      index => {
        if (index === 0) {
          e.preventDefault() // 阻止默认行为，一定要有
          mainWindow.minimize() // 调用 最小化实例方法
        } else {
          mainWindow = null
          // app.quit(); // 不要用quit();试了会弹两次
          app.exit() // exit()直接关闭客户端，不会执行quit();
        }
      }
    )
  })
}

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    mainWindow.webContents.openDevTools()
  })
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // 判定是否是mac系统，若不是则直接退出，否则什么都不做，这样在mac下关闭了进程也不终结，图标驻留在dock拦上
    app.quit()
    // app.exit()
  }
})

app.on('activate', () => {
  // electron专门为mac系统提供的一个事件，当应用程序被激活会触发。
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('close-app', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on('min-app', () => {
  mainWindow.minimize()
})

// ipcMain.on('sigShowRightClickMenu', (event) => {
//   console.log('haha')
//   const menu = new Menu()
//   menu.append(new MenuItem({ label: '复制', role: 'copy' }))

//   const win = BrowserWindow.fromWebContents(event.sender)
//   menu.popup(win)
// })

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
