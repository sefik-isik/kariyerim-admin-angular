import { Component } from '@angular/core';
import { UniversityByPageListComponent } from '../universityByPageList/universityByPageList.component';

@Component({
  selector: 'app-university-by-page-list-tab',
  template: `<div class="card-body">
    <app-universityByPageList></app-universityByPageList>
  </div> `,
  imports: [UniversityByPageListComponent],
})
export class UniversityByPageListTab {}
