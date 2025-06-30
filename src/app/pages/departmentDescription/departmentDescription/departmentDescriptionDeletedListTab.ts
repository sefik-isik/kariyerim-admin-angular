import { Component } from '@angular/core';
import { DepartmentDescriptionDeletedListComponent } from '../departmentDescriptionDeletedList/departmentDescriptionDeletedList.component';

@Component({
  selector: 'app-department-description-deleted-list-tab',
  template: `<div class="card-body">
    <app-departmentDescriptionDeletedList></app-departmentDescriptionDeletedList>
  </div> `,
  imports: [DepartmentDescriptionDeletedListComponent],
})
export class DepartmentDetailMainDeletedListTab {}
