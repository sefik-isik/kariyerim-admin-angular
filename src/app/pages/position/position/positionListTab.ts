import { Component } from '@angular/core';
import { PositionListComponent } from '../positionList/positionList.component';

@Component({
  selector: 'app-position-list-tab',
  template: `<div class="card-body">
    <app-positionList></app-positionList>
  </div> `,
  imports: [PositionListComponent],
})
export class PositionListTab {}
