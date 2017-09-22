import { Injectable } from '@angular/core';

import { ipcRenderer } from 'electron';
import * as os from 'os';

declare global {
  interface Window {
    fs: any;
    os: any;
    electron: any;
    process: any;
  }
}

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  os: typeof os;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.electron.ipcRenderer;
      this.os = window.os;
    }
  }

  isElectron() {
    return (window && window.process && window.process.type);
  }

}
