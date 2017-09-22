import { Injectable } from '@angular/core';

import { ipcRenderer, remote } from 'electron';
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
  remote: typeof remote;
  os: typeof os;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.electron.ipcRenderer;
      this.remote = window.electron.remote;
      this.os = window.os;
    }
  }

  isElectron() {
    return (window && window.process && window.process.type);
  }

}
