const path = require('path')
const url = require('url')
const { app, BrowserWindow } = require('electron')

var win = null // Create Main Window
var devtools = null // Create Tools Window
var tools = true // Needs Devtools
var html = ['index.html', 'main.html'] // Html Data

function create() {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: __dirname + 'src/files/img/logo.png',
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/' + html[1]),
        protocol: 'file',
        slashes: true
    }))

    // Add icon
    win.setIcon(path.join(__dirname, 'src/files/img/logo.png'))

    // Add Name
    win.setTitle('Editor Max')

    // Create Devtools
    if (tools) {
        devtools = new BrowserWindow()
        win.webContents.setDevToolsWebContents(devtools.webContents)
        win.webContents.openDevTools({ mode: 'detach' })
        win.webContents.once('did-finish-load', function () {
            let z = win.getBounds();
            devtools.setPosition(z.x + z.width, z.y)
        })

        devtools.on('closed', () => devtools = null)
    }

    // Move Devtools
    win.on('move', () => {
        if (tools && devtools !== null) {
            let z = win.getBounds()
            devtools.setPosition(z.x + z.width, z.y)
        }
    })

    // Close Main Window
    win.on('closed', () => {
        win = null
        devtools = null
        app.quit()
    })
}

// App Function
app.on('ready', create)
app.on('window-all-closed', () => app.quit())