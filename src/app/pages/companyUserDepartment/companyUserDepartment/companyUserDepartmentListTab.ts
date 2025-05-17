import { Component } from '@angular/core';
import { CompanyUserDepartmentListComponent } from '../companyUserDepartmentList/companyUserDepartmentList.component';

@Component({
  selector: 'app-companyUserDepartment-list-tab',
  template: `
    <div class="card-body">
      <app-companyUserDepartmentList></app-companyUserDepartmentList>
    </div>
  `,
  imports: [CompanyUserDepartmentListComponent],
})
export class CompanyUserDepartmentListTab {}
