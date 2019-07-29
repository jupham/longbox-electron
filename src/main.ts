import { app, BrowserWindow } from 'electron';
import { ipcMain } from 'electron-better-ipc';
import 'reflect-metadata';
import { createConnection, Connection, getConnection } from 'typeorm';
import { Comic } from './app/entity/comic';
import { write } from 'fs';
declare let MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: any;

const createWindow = (): void => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 750,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', (): void => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', (): void => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', (): void => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// Init Database Connection
const initTypeORM = async () => {
    let connection = await createConnection({
        type: 'sqljs',
        location: './dbtest.db',
        autoSave: true,
        synchronize: true,
        entities: [Comic],
    });
};
initTypeORM();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.answerRenderer('storeComic', async (writeComics: Comic[]) => {
    console.log('STORE COMICS');
    console.log(writeComics.length);
    for (let i = 0; i < writeComics.length; i++) {
        let comic = writeComics[i];
        console.log(`Writing Comic ${comic.name}`);
        try {
            let result = await getConnection()
                .getRepository(Comic)
                .save(comic);
            console.log(`SAVE RESULT ${result}`);
        } catch (ex) {
            console.log(`Failure writing comic ${comic.name}\n${ex}`);
        }
    }
    return true;
});

ipcMain.answerRenderer('getComics', async (): Promise<any> => {
    console.log('GET COMICS');

    try {
        let results = await getConnection()
                .getRepository(Comic)
                .find();
        return results;
    } catch (err) {
        console.log(`Failure getting comics\n${err}`);
    }
});