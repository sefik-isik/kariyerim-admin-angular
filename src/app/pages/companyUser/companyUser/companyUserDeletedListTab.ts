import { Component } from '@angular/core';
import { CompanyUserDeletedListComponent } from '../companyUserDeletedList/companyUserDeletedList.component';

@Component({
  selector: 'app-companyUser-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserDeletedList></app-companyUserDeletedList>
  </div> `,
  imports: [CompanyUserDeletedListComponent],
})
export class CompanyUserDeletedListTab {}
