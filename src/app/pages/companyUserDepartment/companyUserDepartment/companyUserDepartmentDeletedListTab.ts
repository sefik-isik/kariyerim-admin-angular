import { Component } from '@angular/core';
import { CompanyUserDepartmentDeletedListComponent } from '../companyUserDepartmentDeletedList/companyUserDepartmentDeletedList.component';

@Component({
  selector: 'app-companyUserDepartment-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserDepartmentDeletedList></app-companyUserDepartmentDeletedList>
  </div> `,
  imports: [CompanyUserDepartmentDeletedListComponent],
})
export class CompanyUserDepartmentDeletedListTab {}
