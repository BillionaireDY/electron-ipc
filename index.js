// research npx nvm keyword 
const {app, BrowserWindow, ipcMain, ipcRenderer, shell} = require('electron');
const url = require('url');
const path = require('path');

const HTML = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, 'index.html')
});

app.on('ready', () => {
    console.log('ready');
    console.log(process.versions);
    console.log(process.platform);
    console.log(process.type);

    const win = new BrowserWindow({
        show: false
    });

    win.loadURL(HTML);
    win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show();
    });

    ipcMain.on('coffee', (event, payload) => {
        // socket 작업이랑 비슷함..
        console.log(payload);
        setTimeout(() => {
            event.sender.send('donut', {name: 'choco', ea: '1EA'});
        }, 1000)
    });

    ipcMain.on('food', (event, payload) => {
        // shell.openExternal('https://naver.com');
        // sync action
        shell.beep();
        event.returnValue = 'give me some food';
    });
});