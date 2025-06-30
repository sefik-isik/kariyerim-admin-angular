import { Component } from '@angular/core';
import { LicenseDegreeDeletedListComponent } from '../licenseDegreeDeletedList/licenseDegreeDeletedList.component';

@Component({
  selector: 'app-licenseDegree-deleted-list-tab',
  template: `<div class="card-body">
    <app-licenseDegreeDeletedList></app-licenseDegreeDeletedList>
  </div> `,
  imports: [LicenseDegreeDeletedListComponent],
})
export class LicenseDegreeDeletedListTab {}
