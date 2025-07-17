import { Component } from '@angular/core';
import { CompanyUserAdvertCityListComponent } from '../companyUserAdvertCityList/companyUserAdvertCityList.component';

@Component({
  selector: 'app-companyUserAdvertCity-list-tab',
  template: `
    <div class="card-body">
      <app-companyUserAdvertCityList></app-companyUserAdvertCityList>
    </div>
  `,
  imports: [CompanyUserAdvertCityListComponent],
})
export class CompanyUserAdvertCityListTab {}
