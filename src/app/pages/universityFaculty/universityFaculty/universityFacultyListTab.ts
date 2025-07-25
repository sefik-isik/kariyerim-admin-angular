import { Component } from '@angular/core';
import { UniversityFacultyListComponent } from '../universityFacultyList/universityFacultyList.component';

@Component({
  selector: 'app-university-faculty-list-tab',
  template: `<div class="card-body">
    <app-universityFacultyList></app-universityFacultyList>
  </div> `,
  imports: [UniversityFacultyListComponent],
})
export class UniversityFacultyListTab {}
