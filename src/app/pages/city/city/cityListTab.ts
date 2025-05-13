import { Component } from '@angular/core';
import { CityListComponent } from '../cityList/cityList.component';

@Component({
  selector: 'app-city-list-tab',
  template: ` <div class="card-body"><app-cityList></app-cityList></div> `,
  imports: [CityListComponent],
})
export class CityListTab {}
