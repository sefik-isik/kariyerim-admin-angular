import { Component } from '@angular/core';
import { AllUserListComponent } from '../allUserList/allUserList.component';

@Component({
  selector: 'app-all-user-list-tab',
  template: `
    <div class="card-body"><app-allUserList></app-allUserList></div>
  `,
  imports: [AllUserListComponent],
})
export class AllUserListTab {}
