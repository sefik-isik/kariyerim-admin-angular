import { Component } from '@angular/core';
import { PersonelUserImageDeletedListComponent } from '../personelUserImageDeletedList/personelUserImageDeletedList.component';

@Component({
  selector: 'app-personelUserImage-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserImageDeletedList></app-personelUserImageDeletedList>
  </div> `,
  imports: [PersonelUserImageDeletedListComponent],
})
export class PersonelUserImageDeletedListTab {}
