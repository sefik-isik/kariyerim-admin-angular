import { Component } from '@angular/core';
import { CityListComponent } from '../cityList/cityList.component';

@Component({
  selector: 'app-city-list-tab',
  template: `
    <div class="card tab-page" style="border: none">
      <div class="card-body">
        <app-cityList></app-cityList>
      </div>
    </div>
  `,
  imports: [CityListComponent],
})
export class CityListTab {}
