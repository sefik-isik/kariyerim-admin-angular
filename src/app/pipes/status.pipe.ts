import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    let result: string = '';
    if (value == Status) {
      result = 'Admin';
    } else {
      result = 'Normal User';
    }

    return result;
  }
}
