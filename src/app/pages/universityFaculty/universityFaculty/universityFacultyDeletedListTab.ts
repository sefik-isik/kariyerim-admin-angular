import { Component } from '@angular/core';
import { UniversityFacultyDeletedListComponent } from '../universityFacultyDeletedList/universityFacultyDeletedList.component';

@Component({
  selector: 'app-universityFaculty-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityFacultyDeletedList></app-universityFacultyDeletedList>
  </div> `,
  imports: [UniversityFacultyDeletedListComponent],
})
export class UniversityFacultyDeletedListTab {}
