// research npx nvm keyword 
const {app, BrowserWindow, ipcMain, ipcRenderer, shell} = require('electron');
const url = require('url');
const path = require('path');

const HTML = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, 'index.html')
})

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
})

// package
/**
 * 실행파일 생성 / 설치파일 생성
 * npm install electron-packager -D
 *   nodemodules/.bin electron-packager .
 * or
 * 
 * 빌더로 생성시 icon 
 * npm install electron-builder -D
 * electron-builder 는 default 값으로 /build 의 리소스를 확인. 
 * Mac 에서는 apple developer에서 등록하고 돈내고..하는 과정이필요하다. 
 * 
 * window 에서 builder 이용하기
 * window 에서는 전자서명이 정말 중요하다.
 * electron builder 로 실행파일을 만든다.
 *   nodemodules/.bin electron-builder .
 *   or npx electron-builder
 * 그 후 inno setup 으로 설치파일을 생성한다.
 * 이 때 perl코드를 설정해야하는데, electron으로 만들어진 VScode를 참조한다. (vscode github의 /build/...ins 파일 참조)
 * 그리고 npm 의 innosetup-compiler로 작업하는 과정을 거친다.....이건또뭐얏
 * blog.dramandcompany.com 기술블로그 참고.
 *
 */