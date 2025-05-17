import { Component } from '@angular/core';
import { CountryListComponent } from '../countryList/countryList.component';

@Component({
  selector: 'app-country-list-tab',
  template: `
    <div class="card-body"><app-countryList></app-countryList></div>
  `,
  imports: [CountryListComponent],
})
export class CountryListTab {}
