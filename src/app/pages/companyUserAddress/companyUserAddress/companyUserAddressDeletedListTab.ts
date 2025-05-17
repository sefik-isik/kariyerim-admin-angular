import { Component } from '@angular/core';
import { CompanyUserAddressDeletedListComponent } from '../companyUserAddressDeletedList/companyUserAddressDeletedList.component';

@Component({
  selector: 'app-companyUserAddress-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserAddressDeletedList></app-companyUserAddressDeletedList>
  </div> `,
  imports: [CompanyUserAddressDeletedListComponent],
})
export class CompanyUserAddressDeletedListTab {}
