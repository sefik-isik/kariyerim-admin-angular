import { Component } from '@angular/core';
import { CompanyUserAdvertJobDescriptionListComponent } from '../companyUserAdvertJobDescriptionList/companyUserAdvertJobDescriptionList.component';

@Component({
  selector: 'app-companyUserAdvertJobDescription-list-tab',
  template: `<div class="card-body">
    <app-companyUserAdvertJobDescriptionList></app-companyUserAdvertJobDescriptionList>
  </div> `,
  imports: [CompanyUserAdvertJobDescriptionListComponent],
})
export class CompanyUserAdvertJobDescriptionListTab {}
