import { Component } from '@angular/core';
import { UniversityListComponent } from '../universityList/universityList.component';

@Component({
  selector: 'app-university-list-tab',
  template: `
    <div class="card-body"><app-universityList></app-universityList></div>
  `,
  imports: [UniversityListComponent],
})
export class UniversityListTab {}
