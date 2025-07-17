import { Component } from '@angular/core';
import { CompanyUserAdvertDeletedListComponent } from '../companyUserAdvertDeletedList/companyUserAdvertDeletedList.component';

@Component({
  selector: 'app-companyUserAdvert-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserAdvertDeletedList></app-companyUserAdvertDeletedList>
  </div> `,
  imports: [CompanyUserAdvertDeletedListComponent],
})
export class CompanyUserAdvertDeletedListTab {}
