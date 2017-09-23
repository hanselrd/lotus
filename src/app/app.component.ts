import { Component } from '@angular/core';

import { ElectronService } from './services/electron.service';
import { HwidService } from './services/electron/hwid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public electronService: ElectronService,
              public hwidService: HwidService) {
    console.log(electronService.isElectron());
    if (electronService.isElectron()) {
      console.log(electronService.os.platform(), electronService.os.arch());
      console.log('hwid', hwidService.hwid);
    }
  }

  openFile() {
    if (this.electronService.isElectron()) {
      this.electronService.remote.dialog.showOpenDialog({
        title: 'find file for me',
        properties: ['openFile', 'showHiddenFiles']
      }, (filePaths: string[]) => {
        console.log(filePaths);
      });
    }
  }

  showMessage() {
    if (this.electronService.isElectron()) {
      this.electronService.remote.dialog.showMessageBox({
        title: 'test',
        message: 'test_message',
        type: 'info',
        buttons: ['OK', 'Cancel']
      }, (response: number, checkboxChecked: boolean) => {
        console.log(response, checkboxChecked);
      });
    }
  }

}
