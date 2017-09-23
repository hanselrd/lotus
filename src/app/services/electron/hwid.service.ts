import { Injectable } from '@angular/core';

import { ElectronService } from './../electron.service';

@Injectable()
export class HwidService {

  hwid: Promise<string>;

  constructor(private electronService: ElectronService) {
    if (electronService.isElectron()) {
      this.hwid = this.computeHwid();
    }
  }

  private async computeHwid() {
    const si = this.electronService.si;

    try {
      let hwid = '';

      const blockDevicesData = await si.blockDevices();
      hwid += `${blockDevicesData[0].model}.${blockDevicesData[0].protocol}.${blockDevicesData[0].serial}.${blockDevicesData[0].size}`;

      const cpuData = await si.cpu();
      hwid += `.${cpuData.brand}.${cpuData.cores}.${cpuData.family}.${cpuData.model}`;

      const memData = await si.mem();
      hwid += `.${memData.total}`;

      const graphicsData = await si.graphics();
      hwid += `.${graphicsData.controllers[0].model}.${graphicsData.controllers[0].vendor}.${graphicsData.controllers[0].vram}`;

      return this.electronService.crypto.createHash('sha256')
        .update(hwid)
        .digest('hex');
    } catch(e) {
      console.log(e);
    }
  }

}
