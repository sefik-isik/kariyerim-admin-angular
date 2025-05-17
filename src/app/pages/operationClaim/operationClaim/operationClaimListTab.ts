import { Component } from '@angular/core';
import { OperationClaimListComponent } from '../operationClaimList/operationClaimList.component';

@Component({
  selector: 'app-operationClaim-list-tab',
  template: `
    <div class="card-body">
      <app-operationClaimList></app-operationClaimList>
    </div>
  `,
  imports: [OperationClaimListComponent],
})
export class OperationClaimListTab {}
