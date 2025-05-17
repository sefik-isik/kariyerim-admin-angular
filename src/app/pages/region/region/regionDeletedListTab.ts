import { Component } from '@angular/core';
import { RegionDeletedListComponent } from '../regionDeletedLİst/regionDeletedList.component';

@Component({
  selector: 'app-region-deleted-list-tab',
  template: `<div class="card-body">
    <app-regionDeletedList></app-regionDeletedList>
  </div> `,
  imports: [RegionDeletedListComponent],
})
export class RegionDeletedListTab {}
