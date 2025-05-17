import { Component } from '@angular/core';
import { UserOperationClaimListComponent } from '../userOperationClaimList/userOperationClaimList.component';

@Component({
  selector: 'app-userOperationClaim-list-tab',
  template: `
    <div class="card-body">
      <app-userOperationClaimList></app-userOperationClaimList>
    </div>
  `,
  imports: [UserOperationClaimListComponent],
})
export class UserOperationClaimListTab {}
