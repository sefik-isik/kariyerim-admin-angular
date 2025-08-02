import { Component } from '@angular/core';
import { PositionByPageListComponent } from '../positionByPageList/positionByPageList.component';

@Component({
  selector: 'app-position-by-page-list-tab',
  template: `<div class="card-body">
    <app-positionByPageList></app-positionByPageList>
  </div> `,
  imports: [PositionByPageListComponent],
})
export class PositionByPageListTab {}
