import { Component } from '@angular/core';
import { CompanyUserDepartmentDeletedListComponent } from '../companyUserDepartmentDeletedList/companyUserDepartmentDeletedList.component';

@Component({
  selector: 'app-city-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserDepartmentDeletedList></app-companyUserDepartmentDeletedList>
  </div> `,
  imports: [CompanyUserDepartmentDeletedListComponent],
})
export class CompanyUserDepartmentDeletedListTab {}
