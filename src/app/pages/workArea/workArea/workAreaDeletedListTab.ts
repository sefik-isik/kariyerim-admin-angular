import { Component } from '@angular/core';
import { WorkAreaDeletedListComponent } from '../workAreaDeletedList/workAreaDeletedList.component';

@Component({
  selector: 'app-workArea-deleted-list-tab',
  template: `<div class="card-body">
    <app-workAreaDeletedList></app-workAreaDeletedList>
  </div> `,
  imports: [WorkAreaDeletedListComponent],
})
export class WorkAreaDeletedListTab {}
