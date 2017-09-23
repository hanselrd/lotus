import { Injectable } from '@angular/core';

import { ElectronService } from './../electron.service';

@Injectable()
export class HwidService {

  private _hwid = '';
  private done = false;

  constructor(private electronService: ElectronService) {
    if (electronService.isElectron()) {
      let si = electronService.si;
      si.blockDevices()
        .then(data => {
          this._hwid += `${data[0].model}.${data[0].protocol}.${data[0].serial}.${data[0].size}`
          si.cpu()
            .then(data => {
              this._hwid += `.${data.brand}.${data.cores}.${data.family}.${data.model}`;
              si.mem()
                .then(data => {
                  this._hwid += `.${data.total}`;
                  si.graphics()
                    .then(data => {
                      this._hwid += `.${data.controllers[0].model}.${data.controllers[0].vendor}.${data.controllers[0].vram}`
                      this._hwid = electronService.crypto.createHash('sha256')
                        .update(this._hwid)
                        .digest('hex');
                      this.done = true;
                    });
                });
            });
        });
    }
  }

  get hwid() {
    if (this.done) {
      return this._hwid;
    } else {
      return null;
    }
  }

}
