import { Component } from '@angular/core';
import { FacultyListComponent } from '../facultyList/facultyList.component';

@Component({
  selector: 'app-faculty-list-tab',
  template: `
    <div class="card-body"><app-facultyList></app-facultyList></div>
  `,
  imports: [FacultyListComponent],
})
export class FacultyListTab {}
