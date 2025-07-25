import { Component } from '@angular/core';
import { PositionDescriptionListComponent } from '../positionDescriptionList/positionDescriptionList.component';

@Component({
  selector: 'app-position-description-list-tab',
  template: `<div class="card-body">
    <app-positionDescriptionList></app-positionDescriptionList>
  </div> `,
  imports: [PositionDescriptionListComponent],
})
export class PositionDescriptionListTab {}
