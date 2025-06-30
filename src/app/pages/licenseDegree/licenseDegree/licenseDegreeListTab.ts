import { Component } from '@angular/core';
import { LicenseDegreeListComponent } from '../licenseDegreeList/licenseDegreeList.component';

@Component({
  selector: 'app-licenseDegree-list-tab',
  template: `
    <div class="card-body"><app-licenseDegreeList></app-licenseDegreeList></div>
  `,
  imports: [LicenseDegreeListComponent],
})
export class LicenseDegreeListTab {}
