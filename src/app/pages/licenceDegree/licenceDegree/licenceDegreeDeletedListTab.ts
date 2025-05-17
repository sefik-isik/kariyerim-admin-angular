import { Component } from '@angular/core';
import { LicenceDegreeDeletedListComponent } from '../licenceDegreeDeletedList/licenceDegreeDeletedList.component';

@Component({
  selector: 'app-licenceDegree-deleted-list-tab',
  template: `<div class="card-body">
    <app-licenceDegreeDeletedList></app-licenceDegreeDeletedList>
  </div> `,
  imports: [LicenceDegreeDeletedListComponent],
})
export class LicenceDegreeDeletedListTab {}
