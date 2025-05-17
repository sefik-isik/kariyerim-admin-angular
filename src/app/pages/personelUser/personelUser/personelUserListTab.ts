import { Component } from '@angular/core';
import { PersonelUserListComponent } from '../personelUserList/personelUserList.component';

@Component({
  selector: 'app-personelUser-list-tab',
  template: `
    <div class="card-body"><app-personelUserList></app-personelUserList></div>
  `,
  imports: [PersonelUserListComponent],
})
export class PersonelUserListTab {}
