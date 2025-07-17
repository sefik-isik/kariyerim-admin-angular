import { Component } from '@angular/core';
import { CompanyUserAdvertJobDescriptionDeletedListComponent } from '../companyUserAdvertJobDescriptionDeletedList/companyUserAdvertJobDescriptionDeletedList.component';
@Component({
  selector: 'app-companyUserAdvertJobDescription-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserAdvertJobDescriptionDeletedList></app-companyUserAdvertJobDescriptionDeletedList>
  </div> `,
  imports: [CompanyUserAdvertJobDescriptionDeletedListComponent],
})
export class CompanyUserAdvertJobDescriptionDeletedListTab {}
