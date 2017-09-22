import { Injectable } from '@angular/core';

import { ipcRenderer, remote } from 'electron';
import * as si from 'systeminformation';
import * as fs from 'fs';
import * as os from 'os';

declare global {
  interface Window {
    electron: any;
    process: any;
    si: any;
    fs: any;
    os: any;
  }
}

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  remote: typeof remote;
  si: typeof si;
  fs: typeof fs;
  os: typeof os;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.electron.ipcRenderer;
      this.remote = window.electron.remote;
      this.si = window.si;
      this.fs = window.fs;
      this.os = window.os;
    }
  }

  isElectron() {
    return (window && window.process && window.process.type);
  }

}
