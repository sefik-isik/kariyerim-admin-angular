import { Component } from '@angular/core';
import { PersonelUserDeletedListComponent } from '../personelUserDeletedLİst/personelUserDeletedList.component';

@Component({
  selector: 'app-personelUser-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserDeletedList></app-personelUserDeletedList>
  </div> `,
  imports: [PersonelUserDeletedListComponent],
})
export class PersonelUserDeletedListTab {}
