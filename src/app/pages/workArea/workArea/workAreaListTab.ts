import { Component } from '@angular/core';
import { WorkAreaListComponent } from '../workAreaList/workAreaList.component';

@Component({
  selector: 'app-WorkArea-deleted-list-tab',
  template: `<div class="card-body">
    <app-workAreaList></app-workAreaList>
  </div> `,
  imports: [WorkAreaListComponent],
})
export class WorkAreaListTab {}
