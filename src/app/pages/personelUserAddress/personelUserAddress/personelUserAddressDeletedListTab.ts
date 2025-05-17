import { Component } from '@angular/core';
import { PersonelUserAddressDeletedListComponent } from '../personelUserAddressDeletedLİst/personelUserAddressDeletedList.component';

@Component({
  selector: 'app-personelUserAddress-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserAddressDeletedList></app-personelUserAddressDeletedList>
  </div> `,
  imports: [PersonelUserAddressDeletedListComponent],
})
export class PersonelUserAddressDeletedListTab {}
