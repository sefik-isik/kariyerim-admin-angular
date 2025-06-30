import { Pipe, PipeTransform } from '@angular/core';
import { AdminStatus, UserStatus } from '../models/concrete/status';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: string): string {
    let result: string = '';
    if (value == AdminStatus) {
      result = 'Admin';
    } else if (value == UserStatus) {
      result = 'User';
    } else {
      result = 'Unknown User';
    }

    return result;
  }
}
