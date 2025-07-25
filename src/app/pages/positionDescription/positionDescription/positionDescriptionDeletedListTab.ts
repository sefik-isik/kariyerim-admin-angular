import { Component } from '@angular/core';
import { PositionDescriptionDeletedListComponent } from '../positionDescriptionDeletedList/positionDescriptionDeletedList.component';

@Component({
  selector: 'app-position-description-deleted-list-tab',
  template: `<div class="card-body">
    <app-positionDescriptionDeletedList></app-positionDescriptionDeletedList>
  </div> `,
  imports: [PositionDescriptionDeletedListComponent],
})
export class PositionDescriptionDeletedListTab {}
