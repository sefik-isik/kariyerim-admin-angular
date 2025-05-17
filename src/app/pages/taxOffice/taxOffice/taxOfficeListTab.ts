import { Component } from '@angular/core';
import { TaxOfficeListComponent } from '../taxOfficeList/taxOfficeList.component';

@Component({
  selector: 'app-taxOffice-list-tab',
  template: `
    <div class="card-body"><app-taxOfficeList></app-taxOfficeList></div>
  `,
  imports: [TaxOfficeListComponent],
})
export class TaxOfficeListTab {}
