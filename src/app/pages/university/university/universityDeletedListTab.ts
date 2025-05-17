import { Component } from '@angular/core';
import { UniversityDeletedListComponent } from '../universityDeletedLİst/universityDeletedList.component';

@Component({
  selector: 'app-university-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityDeletedList></app-universityDeletedList>
  </div> `,
  imports: [UniversityDeletedListComponent],
})
export class UniversityDeletedListTab {}
