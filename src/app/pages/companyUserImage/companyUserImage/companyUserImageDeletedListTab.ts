import { Component } from '@angular/core';
import { CompanyUserImageDeletedListComponent } from '../companyUserImageDeletedList/companyUserImageDeletedList.component';

@Component({
  selector: 'app-companyUserImage-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserImageDeletedList></app-companyUserImageDeletedList>
  </div> `,
  imports: [CompanyUserImageDeletedListComponent],
})
export class CompanyUserImageDeletedListTab {}
