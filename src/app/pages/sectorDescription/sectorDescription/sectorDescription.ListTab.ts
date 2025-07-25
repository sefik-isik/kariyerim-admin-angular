import { Component } from '@angular/core';
import { SectorDescriptionListComponent } from '../sectorDescriptionList/sectorDescriptionList.component';

@Component({
  selector: 'app-sector-description-list-tab',
  template: `<div class="card-body">
    <app-sectorDescriptionList></app-sectorDescriptionList>
  </div> `,
  imports: [SectorDescriptionListComponent],
})
export class SectorDescriptionListTab {}
