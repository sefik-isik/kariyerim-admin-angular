import { Component } from '@angular/core';
import { PersonelUserCvSummaryListComponent } from '../personelUserCvSummaryList/personelUserCvSummaryList.component';

@Component({
  selector: 'app-personelUserCvSummary-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserCvSummaryList></app-personelUserCvSummaryList>
    </div>
  `,
  imports: [PersonelUserCvSummaryListComponent],
})
export class PersonelUserCvSummaryListTab {}
