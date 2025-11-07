
import { contextBridge } from 'electron';

// You can expose protected APIs here to your renderer process
// For now, we'll just log that the preload script is loaded.
console.log('Preload script loaded.');

// Example of exposing a simple API:
contextBridge.exposeInMainWorld('myAPI', {
  // Add functions here that you want to call from your React app
});
