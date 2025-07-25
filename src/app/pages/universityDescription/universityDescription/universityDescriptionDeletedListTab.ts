import { Component } from '@angular/core';
import { UniversityDescriptionDeletedListComponent } from '../universityDescriptionDeletedList/universityDescriptionDeletedList.component';

@Component({
  selector: 'app-university-description-deleted-list-tab',
  template: `<div class="card-body">
    <app-universityDescriptionDeletedList></app-universityDescriptionDeletedList>
  </div> `,
  imports: [UniversityDescriptionDeletedListComponent],
})
export class UniversityDescriptionDeletedListTab {}
