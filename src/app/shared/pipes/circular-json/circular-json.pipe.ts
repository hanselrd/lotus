import { Pipe, PipeTransform } from '@angular/core';

import * as CircularJSON from 'circular-json';

@Pipe({
  name: 'circularJson',
  pure: false
})
export class CircularJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return CircularJSON.stringify(value, null, 2);
  }

}
