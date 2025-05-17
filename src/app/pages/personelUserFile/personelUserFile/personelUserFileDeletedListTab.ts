import { Component } from '@angular/core';
import { PersonelUserFileDeletedListComponent } from '../personelUserFileDeletedList/personelUserFileDeletedList.component';

@Component({
  selector: 'app-personelUserFile-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserFileDeletedList></app-personelUserFileDeletedList>
  </div> `,
  imports: [PersonelUserFileDeletedListComponent],
})
export class PersonelUserFileDeletedListTab {}
