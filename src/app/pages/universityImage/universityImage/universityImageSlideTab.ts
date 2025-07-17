import { UniversityImageSlideComponent } from '../universityImageSlide/universityImageSlide.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-universityImage-slide-tab',
  template: `
    <div class="card-body">
      <app-universityImageSlide></app-universityImageSlide>
    </div>
  `,
  imports: [UniversityImageSlideComponent],
})
export class UniversityImageSlideTab {}
