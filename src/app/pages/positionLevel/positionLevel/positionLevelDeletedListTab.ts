import { Component } from '@angular/core';
import { PositionLevelDeletedListComponent } from '../positionLevelDeletedList/positionLevelDeletedList.component';

@Component({
  selector: 'app-positionLevel-deleted-list-tab',
  template: `<div class="card-body">
    <app-positionLevelDeletedList></app-positionLevelDeletedList>
  </div> `,
  imports: [PositionLevelDeletedListComponent],
})
export class PositionLevelDeletedListTab {}
