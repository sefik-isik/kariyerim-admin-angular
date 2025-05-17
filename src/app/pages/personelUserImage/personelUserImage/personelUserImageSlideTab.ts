import { Component } from '@angular/core';

import { PersonelUserImageSlideComponent } from '../personelUserImageSlide/personelUserImageSlide.component';

@Component({
  selector: 'app-personelUserImage-slide-tab',
  template: `
    <div class="card-body">
      <app-personelUserImageSlide></app-personelUserImageSlide>
    </div>
  `,
  imports: [PersonelUserImageSlideComponent],
})
export class PersonelUserImageSlideTab {}
