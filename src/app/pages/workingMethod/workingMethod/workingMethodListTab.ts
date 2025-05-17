import { Component } from '@angular/core';
import { WorkingMethodListComponent } from '../workingMethodList/workingMethodList.component';

@Component({
  selector: 'app-workingMethod-list-tab',
  template: `
    <div class="card-body"><app-workingMethodList></app-workingMethodList></div>
  `,
  imports: [WorkingMethodListComponent],
})
export class WorkingMethodListTab {}
