import { Component } from '@angular/core';
import { CompanyUserByPageListComponent } from '../companyUserByPageList/companyUserByPageList.component';

@Component({
  selector: 'app-companyUserByPage-list-tab',
  template: `
    <div class="card-body">
      <app-companyUserByPageList></app-companyUserByPageList>
    </div>
  `,
  imports: [CompanyUserByPageListComponent],
})
export class CompanyUserByPageListTab {}
