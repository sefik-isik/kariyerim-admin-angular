import { Component } from '@angular/core';
import { TaxOfficeByPageListComponent } from '../taxOfficeByPageList/taxOfficeByPageList.component';

@Component({
  selector: 'app-TaxOffice-by-page-list-tab',
  template: `<div class="card-body">
    <app-taxOfficeByPageList></app-taxOfficeByPageList>
  </div> `,
  imports: [TaxOfficeByPageListComponent],
})
export class TaxOfficeByPageListTab {}
