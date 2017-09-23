import { Injectable } from '@angular/core';

import { ElectronService } from './electron.service';

@Injectable()
export class ElectronHwidService {

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

      const cpuData = await si.cpu();
      hwid += this.appendHelper(
        cpuData.brand,
        cpuData.cache.l1d, cpuData.cache.l1i, cpuData.cache.l2, cpuData.cache.l3,
        cpuData.cores,
        cpuData.family,
        cpuData.manufacturer,
        cpuData.model,
        cpuData.speedmax,
        cpuData.speedmin,
        cpuData.stepping,
        cpuData.vendor
      );

      const graphicsData = await si.graphics();
      for (let controller of graphicsData.controllers) {
        hwid += this.appendHelper(
          controller.bus,
          controller.model,
          controller.vendor,
          controller.vram,
          controller.vramDynamic
        );
      }

      const blockDevicesData = await si.blockDevices();
      for (let blockDevice of blockDevicesData) {
        if (blockDevice.type === 'disk' && !blockDevice.removable) {
          hwid += this.appendHelper(
            blockDevice.label,
            blockDevice.model,
            blockDevice.name,
            blockDevice.physical,
            blockDevice.protocol,
            blockDevice.serial,
            blockDevice.size
          );
        }
      }

      return this.electronService.crypto.createHash('sha256')
        .update(hwid)
        .digest('hex');
    } catch(e) {
      console.log(e);
    }
  }

  private appendHelper(...args: any[]) {
    let temp = '';
    for (let arg of args) {
      temp += `${arg}`;
    }
    return temp;
  }

}
