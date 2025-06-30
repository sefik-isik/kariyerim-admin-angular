import { Pipe, PipeTransform } from '@angular/core';
import { UserOperationClaimDTO } from '../models/dto/userOperationClaimDTO';

@Pipe({
  name: 'filterUserOperationClaim',
})
export class FilterUserOperationClaimPipe implements PipeTransform {
  transform(
    value: UserOperationClaimDTO[],
    filterText: string
  ): UserOperationClaimDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UserOperationClaimDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
