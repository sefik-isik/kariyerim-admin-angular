import { Component } from '@angular/core';
import { DepartmentDetailListComponent } from '../departmentDetailList/departmentDetailList.component';

@Component({
  selector: 'app-department-detail-list-tab',
  template: `<div class="card-body">
    <app-departmentDetailList></app-departmentDetailList>
  </div> `,
  imports: [DepartmentDetailListComponent],
})
export class DepartmentDetailMainListTab {}
