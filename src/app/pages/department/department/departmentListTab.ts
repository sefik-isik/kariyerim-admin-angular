import { Component } from '@angular/core';
import { DepartmentListComponent } from '../departmentList/departmentList.component';

@Component({
  selector: 'app-department-list-tab',
  template: `
    <div class="card-body">
      <app-departmentList></app-departmentList>
    </div>
  `,
  imports: [DepartmentListComponent],
})
export class DepartmentListTab {}
