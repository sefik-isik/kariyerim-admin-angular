import { Component } from '@angular/core';
import { FacultyDeletedListComponent } from '../facultyDeletedList/facultyDeletedList.component';

@Component({
  selector: 'app-faculty-deleted-list-tab',
  template: `<div class="card-body">
    <app-facultyDeletedList></app-facultyDeletedList>
  </div> `,
  imports: [FacultyDeletedListComponent],
})
export class FacultyDeletedListTab {}
