import { Pipe, PipeTransform } from '@angular/core';
import { UserOperationClaimDTO } from '../models/userOperationClaimDTO';

@Pipe({
  name: 'filterUserOperationClaimByUser',
})
export class FilterUserOperationClaimByUserPipe implements PipeTransform {
  transform(
    value: UserOperationClaimDTO[],
    filterText: string
  ): UserOperationClaimDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UserOperationClaimDTO) =>
            c.operationClaimName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
