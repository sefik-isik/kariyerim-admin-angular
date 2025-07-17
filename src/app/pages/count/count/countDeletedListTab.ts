import { Component } from '@angular/core';
import { CountDeletedListComponent } from '../countDeletedList/countDeletedList.component';

@Component({
  selector: 'app-count-deleted-list-tab',
  template: `<div class="card-body">
    <app-countDeletedList></app-countDeletedList>
  </div> `,
  imports: [CountDeletedListComponent],
})
export class CountDeletedListTab {}
