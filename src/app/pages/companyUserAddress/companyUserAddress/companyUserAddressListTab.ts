import { Component } from '@angular/core';
import { CompanyUserAddressListComponent } from '../companyUserAddressList/companyUserAddressList.component';

@Component({
  selector: 'app-companyUserAddress-list-tab',
  template: `
    <div class="card-body">
      <app-companyUserAddressList></app-companyUserAddressList>
    </div>
  `,
  imports: [CompanyUserAddressListComponent],
})
export class CompanyUserAddressListTab {}
