import { Component } from '@angular/core';
import { UniversityDepartmentDeletedListComponent } from '../universityDepartmentDeletedList/universityDepartmentDeletedList.component';

@Component({
  selector: 'app-university-department-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityDepartmentDeletedList></app-universityDepartmentDeletedList>
  </div> `,
  imports: [UniversityDepartmentDeletedListComponent],
})
export class UniversityDepartmentDeletedListTab {}
