import { Component } from '@angular/core';
import { PersonelUserCvDeletedListComponent } from '../personelUserCvDeletedList/personelUserCvDeletedList.component';

@Component({
  selector: 'app-personelUserCv-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserCvDeletedList></app-personelUserCvDeletedList>
  </div> `,
  imports: [PersonelUserCvDeletedListComponent],
})
export class PersonelUserCvDeletedListTab {}
