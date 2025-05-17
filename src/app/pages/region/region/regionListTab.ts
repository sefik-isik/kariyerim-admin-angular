import { Component } from '@angular/core';
import { RegionListComponent } from '../regionList/regionList.component';

@Component({
  selector: 'app-region-list-tab',
  template: ` <div class="card-body"><app-regionList></app-regionList></div> `,
  imports: [RegionListComponent],
})
export class RegionListTab {}
