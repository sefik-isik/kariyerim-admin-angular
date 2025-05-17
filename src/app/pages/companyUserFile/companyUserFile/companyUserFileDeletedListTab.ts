import { Component } from '@angular/core';
import { CompanyUserFileDeletedListComponent } from '../companyUserFileDeletedList/companyUserFileDeletedList.component';

@Component({
  selector: 'app-companyUserFile-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserFileDeletedList></app-companyUserFileDeletedList>
  </div> `,
  imports: [CompanyUserFileDeletedListComponent],
})
export class CompanyUserDeletedListTab {}
