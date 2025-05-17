import { Component } from '@angular/core';
import { UserOperationClaimDeletedListComponent } from '../userOperationClaimDeletedLİst/userOperationClaimDeletedList.component';

@Component({
  selector: 'app-userOperationClaim-deleted-list-tab',
  template: `<div class="card-body">
    <app-userOperationClaimDeletedList></app-userOperationClaimDeletedList>
  </div> `,
  imports: [UserOperationClaimDeletedListComponent],
})
export class UserOperationClaimDeletedListTab {}
