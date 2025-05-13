import { Component } from '@angular/core';
import { CityDeletedListComponent } from '../cityDeletedList/cityDeletedList.component';

@Component({
  selector: 'app-city-deleted-list-tab',
  template: `<div class="card-body">
    <app-cityDeletedList></app-cityDeletedList>
  </div> `,
  imports: [CityDeletedListComponent],
})
export class CityOfDeletedTab {}
