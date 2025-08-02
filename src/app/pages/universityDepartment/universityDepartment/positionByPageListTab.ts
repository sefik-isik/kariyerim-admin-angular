import { Component } from '@angular/core';
import { UniversityDepartmentByPageListComponent } from '../universityDepartmentByPageList/universityDepartmentByPageList.component';

@Component({
  selector: 'app-universityDepartment-by-page-list-tab',
  template: `<div class="card-body">
    <app-universityDepartmentByPageList></app-universityDepartmentByPageList>
  </div> `,
  imports: [UniversityDepartmentByPageListComponent],
})
export class UniversityDepartmentByPageListTab {}
