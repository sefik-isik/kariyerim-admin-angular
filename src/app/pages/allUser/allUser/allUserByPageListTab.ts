import { Component } from '@angular/core';
import { AllUserByPageListComponent } from '../allUserByPageList/allUserByPageList.component';

@Component({
  selector: 'app-allUserByPage-list-tab',
  template: `<div class="card-body">
    <app-allUserByPageList></app-allUserByPageList>
  </div> `,
  imports: [AllUserByPageListComponent],
})
export class AllUserByPageListTab {}
