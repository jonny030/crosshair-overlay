const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

// Optimize Chromium to reduce AppData folder size (cache, spellchecker, etc.)
app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disable-spell-checking');

let overlayWindow;
let settingsWindow;

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

const defaultSettings = {
    style: 'cross',
    size: 3,
    color: '#00ff00',
    thickness: 2,
    gap: 4,
    opacity: 100,
    offsetX: 0,
    offsetY: 24,
    language: 'en',
    visible: true
};

function loadSettings() {
    try {
        if (fs.existsSync(settingsPath)) {
            return { ...defaultSettings, ...JSON.parse(fs.readFileSync(settingsPath, 'utf8')) };
        }
    } catch (error) {
        console.error('Failed to load settings', error);
    }
    return defaultSettings;
}

function saveSettings(settings) {
    try {
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    } catch (error) {
        console.error('Failed to save settings', error);
    }
}

function createWindows() {
    const settings = loadSettings();
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;

    // Create overlay window
    overlayWindow = new BrowserWindow({
        width: width,
        height: height,
        x: primaryDisplay.bounds.x,
        y: primaryDisplay.bounds.y,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        focusable: false,
        icon: path.join(__dirname, '../assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    overlayWindow.setIgnoreMouseEvents(true);
    overlayWindow.loadFile(path.join(__dirname, 'overlay.html'));
    overlayWindow.webContents.on('did-finish-load', () => {
        overlayWindow.webContents.send('update-crosshair', settings);
    });

    // Create settings window
    const settingsWidth = 400;
    const settingsHeight = 870;
    settingsWindow = new BrowserWindow({
        width: settingsWidth,
        height: settingsHeight,
        x: primaryDisplay.bounds.x + Math.floor((width - settingsWidth) / 2),
        y: primaryDisplay.bounds.y + Math.floor((height - settingsHeight) / 2),
        title: 'Crosshair Settings',
        autoHideMenuBar: true,
        icon: path.join(__dirname, '../assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    
    settingsWindow.loadFile(path.join(__dirname, 'settings.html'));
    settingsWindow.webContents.on('did-finish-load', () => {
        settingsWindow.webContents.send('init-settings', settings);
    });

    // Closing settings exits the app for v1
    settingsWindow.on('closed', () => app.quit());
}

app.whenReady().then(() => {
    createWindows();
    ipcMain.on('settings-changed', (event, newSettings) => {
        saveSettings(newSettings);
        if (overlayWindow) overlayWindow.webContents.send('update-crosshair', newSettings);
    });
});