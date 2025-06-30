import { Component } from '@angular/core';
import { DepartmentDescriptionListComponent } from '../departmentDescriptionList/departmentDescriptionList.component';

@Component({
  selector: 'app-department-description-list-tab',
  template: `<div class="card-body">
    <app-departmentDescriptionList></app-departmentDescriptionList>
  </div> `,
  imports: [DepartmentDescriptionListComponent],
})
export class DepartmentDescriptionListTab {}
