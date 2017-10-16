import { Injectable } from '@angular/core';

import { ipcRenderer, remote } from 'electron';
import * as si from 'systeminformation';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';

declare global {
  interface Window {
    process: any;
    _electron: any;
    _si: any;
    _crypto: any;
    _fs: any;
    _os: any;
  }
}

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  remote: typeof remote;
  si: typeof si;
  crypto: typeof crypto;
  fs: typeof fs;
  os: typeof os;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window._electron.ipcRenderer;
      this.remote = window._electron.remote;
      this.si = window._si;
      this.crypto = window._crypto;
      this.fs = window._fs;
      this.os = window._os;
    }
  }

  isElectron() {
    return (window && window._electron)? true : false;
  }

}
