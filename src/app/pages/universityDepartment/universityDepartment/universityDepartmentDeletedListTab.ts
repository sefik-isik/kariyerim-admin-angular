import { Component } from '@angular/core';
import { UniversityDepartmentDeletedListComponent } from '../universityDepartmentDeletedLİst/universityDepartmentDeletedList.component';

@Component({
  selector: 'app-universityDepartment-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityDepartmentDeletedList></app-universityDepartmentDeletedList>
  </div> `,
  imports: [UniversityDepartmentDeletedListComponent],
})
export class UniversityDepartmentDeletedListTab {}
