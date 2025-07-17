import { Component } from '@angular/core';
import { UniversityImageDeletedListComponent } from '../universityImageDeletedList/universityImageDeletedList.component';

@Component({
  selector: 'app-universityImage-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityImageDeletedList></app-universityImageDeletedList>
  </div> `,
  imports: [UniversityImageDeletedListComponent],
})
export class UniversityImageDeletedListTab {}
