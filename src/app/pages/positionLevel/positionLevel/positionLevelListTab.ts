import { Component } from '@angular/core';
import { PositionLevelListComponent } from '../positionLevelList/positionLevelList.component';

@Component({
  selector: 'app-positionLevel-list-tab',
  template: `<div class="card-body">
    <app-positionLevelList></app-positionLevelList>
  </div> `,
  imports: [PositionLevelListComponent],
})
export class PositionLevelListTab {}
