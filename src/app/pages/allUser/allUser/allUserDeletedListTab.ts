import { AllUserDeletedListComponent } from './../allUserDeletedLİst/allUserDeletedList.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-all-user-deleted-list-tab',
  template: `<div class="card-body">
    <app-allUserDeletedList></app-allUserDeletedList>
  </div> `,
  imports: [AllUserDeletedListComponent],
})
export class AllUserDeletedListTab {}
