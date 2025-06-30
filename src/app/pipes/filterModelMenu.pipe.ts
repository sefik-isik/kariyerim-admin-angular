import { Pipe, PipeTransform } from '@angular/core';
import { ModelMenu } from '../models/component/modelMenu';

@Pipe({
  name: 'filterModelMenu',
})
export class FilterModelMenuPipe implements PipeTransform {
  transform(value: ModelMenu[], filterText: string): ModelMenu[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: ModelMenu) =>
            c.modelName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
