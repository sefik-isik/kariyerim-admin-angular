import { Component } from '@angular/core';
import { DepartmentDeletedListComponent } from '../departmentDeletedList/departmentDeletedList.component';

@Component({
  selector: 'app-department-deleted-list-tab',
  template: `<div class="card-body">
    <app-departmentDeletedList></app-departmentDeletedList>
  </div> `,
  imports: [DepartmentDeletedListComponent],
})
export class DepartmentDeletedListTab {}
