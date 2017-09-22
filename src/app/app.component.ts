import { Component } from '@angular/core';

import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private electronService: ElectronService) {
    console.log(this.electronService.isElectron());
    if (this.electronService.isElectron()) {
      console.log(this.electronService.os.platform(),
        this.electronService.os.arch());
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
