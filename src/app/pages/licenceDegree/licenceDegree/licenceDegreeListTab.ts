import { Component } from '@angular/core';
import { LicenceDegreeListComponent } from '../licenceDegreeList/licenceDegreeList.component';

@Component({
  selector: 'app-licenceDegree-list-tab',
  template: `
    <div class="card-body"><app-licenceDegreeList></app-licenceDegreeList></div>
  `,
  imports: [LicenceDegreeListComponent],
})
export class LicenceDegreeListTab {}
