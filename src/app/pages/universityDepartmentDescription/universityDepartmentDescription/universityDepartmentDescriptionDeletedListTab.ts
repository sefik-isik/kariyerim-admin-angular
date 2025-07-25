import { Component } from '@angular/core';
import { UniversityDepartmentDescriptionDeletedListComponent } from '../universityDepartmentDescriptionDeletedList/universityDepartmentDescriptionDeletedList.component';

@Component({
  selector: 'app-university-department-description-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityDepartmentDescriptionDeletedList></app-universityDepartmentDescriptionDeletedList>
  </div> `,
  imports: [UniversityDepartmentDescriptionDeletedListComponent],
})
export class UniversityDepartmentDescriptionDeletedListTab {}
