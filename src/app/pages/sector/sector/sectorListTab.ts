import { Component } from '@angular/core';
import { SectorListComponent } from '../sectorList/sectorList.component';

@Component({
  selector: 'app-sector-list-tab',
  template: ` <div class="card-body"><app-sectorList></app-sectorList></div> `,
  imports: [SectorListComponent],
})
export class SectorListTab {}
