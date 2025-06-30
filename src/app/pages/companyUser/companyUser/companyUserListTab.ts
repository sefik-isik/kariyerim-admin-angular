import { Component } from '@angular/core';
import { CompanyUserListComponent } from '../companyUserList/companyUserList.component';

@Component({
  selector: 'app-companyUser-list-tab',
  template: `
    <div class="card-body"><app-companyUserList></app-companyUserList></div>
  `,
  imports: [CompanyUserListComponent],
})
export class CompanyUserListTab {}
