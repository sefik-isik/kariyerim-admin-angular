import { Component } from '@angular/core';
import { UniversityDepartmentListComponent } from '../universityDepartmentList/universityDepartmentList.component';

@Component({
  selector: 'app-universityDepartment-list-tab',
  template: `
    <div class="card-body">
      <app-universityDepartmentList></app-universityDepartmentList>
    </div>
  `,
  imports: [UniversityDepartmentListComponent],
})
export class UniversityDepartmentListTab {}
