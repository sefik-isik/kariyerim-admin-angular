import { Component } from '@angular/core';
import { UniversityDepartmentListComponent } from '../universityDepartmenttList/universityDepartmentList.component';

@Component({
  selector: 'app-university-department-list-tab',
  template: `
    <div class="card-body">
      <app-universityDepartmentList></app-universityDepartmentList>
    </div>
  `,
  imports: [UniversityDepartmentListComponent],
})
export class UniversityDepartmentListTab {}
