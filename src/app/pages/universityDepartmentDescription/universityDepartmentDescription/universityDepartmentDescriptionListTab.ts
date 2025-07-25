import { Component } from '@angular/core';
import { UniversityDepartmentDescriptionListComponent } from '../universityDepartmentDescriptionList/universityDepartmentDescriptionList.component';

@Component({
  selector: 'app-university-department-description-list-tab',
  template: `<div class="card-body">
    <app-universityDepartmentDescriptionList></app-universityDepartmentDescriptionList>
  </div> `,
  imports: [UniversityDepartmentDescriptionListComponent],
})
export class UniversityDepartmentDescriptionListTab {}
