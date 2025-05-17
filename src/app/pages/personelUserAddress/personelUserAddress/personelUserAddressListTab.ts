import { Component } from '@angular/core';
import { PersonelUserAddressListComponent } from '../personelUserAddressList/personelUserAddressList.component';

@Component({
  selector: 'app-personelUserAddress-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserAddressList></app-personelUserAddressList>
    </div>
  `,
  imports: [PersonelUserAddressListComponent],
})
export class PersonelUserAddressListTab {}
