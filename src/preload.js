const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    onInitSettings: (callback) => ipcRenderer.on('init-settings', (_event, value) => callback(value)),
    onUpdateCrosshair: (callback) => ipcRenderer.on('update-crosshair', (_event, value) => callback(value)),
    settingsChanged: (settings) => ipcRenderer.send('settings-changed', settings)
});