import { Component } from '@angular/core';
import { UniversityDescriptionListComponent } from '../universityDescriptionList/universityDescriptionList.component';

@Component({
  selector: 'app-university-description-list-tab',
  template: `<div class="card-body">
    <app-universityDescriptionList></app-universityDescriptionList>
  </div> `,
  imports: [UniversityDescriptionListComponent],
})
export class UniversityDescriptionListTab {}
