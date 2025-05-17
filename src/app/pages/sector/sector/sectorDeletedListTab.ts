import { Component } from '@angular/core';
import { SectorDeletedListComponent } from '../sectorDeletedLİst/sectorDeletedList.component';

@Component({
  selector: 'app-sector-deleted-list-tab',
  template: `<div class="card-body">
    <app-sectorDeletedList></app-sectorDeletedList>
  </div> `,
  imports: [SectorDeletedListComponent],
})
export class SectorDeletedListTab {}
