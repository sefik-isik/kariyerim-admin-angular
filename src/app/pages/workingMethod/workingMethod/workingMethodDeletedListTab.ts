import { Component } from '@angular/core';
import { WorkingMethodDeletedListComponent } from '../workingMethodDeletedLİst/workingMethodDeletedList.component';

@Component({
  selector: 'app-workingMethod-deleted-list-tab',
  template: `<div class="card-body">
    <app-workingMethodDeletedList></app-workingMethodDeletedList>
  </div> `,
  imports: [WorkingMethodDeletedListComponent],
})
export class WorkingMethodDeletedListTab {}
