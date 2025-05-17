import { Component } from '@angular/core';
import { TaxOfficeDeletedListComponent } from '../taxOfficeDeletedLİst/taxOfficeDeletedList.component';

@Component({
  selector: 'app-taxOffice-deleted-list-tab',
  template: `<div class="card-body">
    <app-taxOfficeDeletedList></app-taxOfficeDeletedList>
  </div> `,
  imports: [TaxOfficeDeletedListComponent],
})
export class TaxOfficeDeletedListTab {}
