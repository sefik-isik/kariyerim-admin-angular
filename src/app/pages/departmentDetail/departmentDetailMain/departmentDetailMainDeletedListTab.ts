import { Component } from '@angular/core';
import { DepartmentDetailDeletedListComponent } from '../departmentDetailDeletedList/departmentDetailDeletedList.component';

@Component({
  selector: 'app-department-detail-deleted-list-tab',
  template: `<div class="card-body">
    <app-departmentDetailDeletedList></app-departmentDetailDeletedList>
  </div> `,
  imports: [DepartmentDetailDeletedListComponent],
})
export class DepartmentDetailMainDeletedListTab {}
