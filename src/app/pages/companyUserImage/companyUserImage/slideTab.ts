import { Component } from '@angular/core';
import { CompanyUserImageSlideComponent } from '../companyUserImageSlide/companyUserImageSlide.component';

@Component({
  selector: 'app-companyUserImage-slide-tab',
  template: `
    <div class="card-body">
      <app-companyUserImageSlide></app-companyUserImageSlide>
    </div>
  `,
  imports: [CompanyUserImageSlideComponent],
})
export class CompanyUserImageSlideTab {}
