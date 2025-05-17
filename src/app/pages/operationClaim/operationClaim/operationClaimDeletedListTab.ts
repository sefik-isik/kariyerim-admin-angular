import { Component } from '@angular/core';
import { OperationClaimDeletedListComponent } from '../operationClaimDeletedLİst/operationClaimDeletedList.component';

@Component({
  selector: 'app-operationClaim-deleted-list-tab',
  template: `<div class="card-body">
    <app-operationClaimDeletedList></app-operationClaimDeletedList>
  </div> `,
  imports: [OperationClaimDeletedListComponent],
})
export class OperationClaimDeletedListTab {}
