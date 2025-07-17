import { Component } from '@angular/core';
import { CompanyUserAdvertCityDeletedListComponent } from '../companyUserAdvertCityDeletedList/companyUserAdvertCityDeletedList.component';

@Component({
  selector: 'app-companyUserAdvertCity-deleted-list-tab',
  template: `<div class="card-body">
    <app-companyUserAdvertCityDeletedList></app-companyUserAdvertCityDeletedList>
  </div> `,
  imports: [CompanyUserAdvertCityDeletedListComponent],
})
export class CompanyUserAdvertCityDeletedListTab {}
