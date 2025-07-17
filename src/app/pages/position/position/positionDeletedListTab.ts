import { Component } from '@angular/core';
import { PositionDeletedListComponent } from '../positionDeletedList/positionDeletedList.component';

@Component({
  selector: 'app-position-deleted-list-tab',
  template: `<div class="card-body">
    <app-positionDeletedList></app-positionDeletedList>
  </div> `,
  imports: [PositionDeletedListComponent],
})
export class PositionDeletedListTab {}
