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
    } else if (
      value ==
      'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9'
    ) {
      result = 'Normal User';
    } else {
      result = 'Unknown User';
    }

    return result;
  }
}
