import { Component } from '@angular/core';
import { SectorDescriptionDeletedListComponent } from '../sectorDescriptionDeletedList/sectorDescriptionDeletedList.component';

@Component({
  selector: 'app-sector-description-deleted-list-tab',
  template: `<div class="card-body">
    <app-sectorDescriptionDeletedList></app-sectorDescriptionDeletedList>
  </div> `,
  imports: [SectorDescriptionDeletedListComponent],
})
export class SectorDescriptionDeletedListTab {}
