const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

/* main window configuration */
const mainWindowDetails = {
  width: 860,
  height: 860,
  resizable: true,
  transparent: true,
  frame: true,
  icon: path.join(__dirname, './64x64_favicon.ico'),
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true,
    experimentalFeatures: true,
    webviewTag: true,
  },
};

// available in global scope
let main;

const createMainScreen = () => {
  const window = new BrowserWindow(mainWindowDetails);

  window.loadURL(
    isDev ? 'http://localhost:4000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  return window;
};

// create app window
function createWindow() {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
  main = createMainScreen('main screen');

  main.once('ready-to-show', () => {
    main.show();
  });

  //open devtools
  main.webContents.openDevTools({
    mode: 'undocked',
  });

  // clean-up
  main.on('closed', () => (main = null));
}

app.on('ready', async () => {
  app.allowRendererProcessReuse = true;

  // Install React Dev Tools
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');

  await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then(extension => console.log(`${extension} was added`))
    .catch(error =>
      console.error('An error during React Developer Tools installation occurred:', error)
    );

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (main === null) {
    createWindow();
  }
});
