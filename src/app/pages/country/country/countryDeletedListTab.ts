import { Component } from '@angular/core';
import { CountryDeletedListComponent } from '../countryDeletedList/countryDeletedList.component';

@Component({
  selector: 'app-country-deleted-list-tab',
  template: `<div class="card-body">
    <app-countryDeletedList></app-countryDeletedList>
  </div> `,
  imports: [CountryDeletedListComponent],
})
export class CountryDeletedListTab {}
