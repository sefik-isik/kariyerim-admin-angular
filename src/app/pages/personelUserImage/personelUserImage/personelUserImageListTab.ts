import { Component } from '@angular/core';
import { PersonelUserImageListComponent } from '../personelUserImageList/personelUserImageList.component';

@Component({
  selector: 'app-personelUserImage-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserImageList></app-personelUserImageList>
    </div>
  `,
  imports: [PersonelUserImageListComponent],
})
export class PersonelUserImageListTab {}
