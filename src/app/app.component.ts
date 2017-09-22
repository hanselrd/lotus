import { Component } from '@angular/core';

import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public electronService: ElectronService) {
    console.log(electronService.isElectron());
    if (electronService.isElectron()) {
      let si = electronService.si;
      si.getAllData()
        .then(data => {
          console.log(data);
          /*  cpu
                brand
                cache
                cores
                manufacturer
                model
              mem
                total
              blockDevices (need to call)
          */
        });
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
