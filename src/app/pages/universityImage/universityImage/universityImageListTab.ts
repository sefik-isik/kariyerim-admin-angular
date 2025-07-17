import { Component } from '@angular/core';
import { UniversityImageListComponent } from '../universityImageList/universityImageList.component';

@Component({
  selector: 'app-universityImage-list-tab',
  template: `
    <div class="card-body">
      <app-universityImageList></app-universityImageList>
    </div>
  `,
  imports: [UniversityImageListComponent],
})
export class UniversityImageListTab {}
