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
}
