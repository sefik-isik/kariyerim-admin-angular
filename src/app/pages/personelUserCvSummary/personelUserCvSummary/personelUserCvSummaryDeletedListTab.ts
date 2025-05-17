import { Component } from '@angular/core';
import { PersonelUserCvSummaryDeletedListComponent } from '../personelUserCvSummaryDeletedList/personelUserCvSummaryDeletedList.component';

@Component({
  selector: 'app-personelUserCvSummary-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserCvSummaryDeletedList></app-personelUserCvSummaryDeletedList>
  </div> `,
  imports: [PersonelUserCvSummaryDeletedListComponent],
})
export class PersonelUserCvSummaryDeletedListTab {}
