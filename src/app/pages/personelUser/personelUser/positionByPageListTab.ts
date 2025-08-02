import { Component } from '@angular/core';
import { PersonelUserByPageListComponent } from '../personelUserByPageList/personelUserByPageList.component';

@Component({
  selector: 'app-PersonelUser-by-page-list-tab',
  template: `<div class="card-body">
    <app-personelUserByPageList></app-personelUserByPageList>
  </div> `,
  imports: [PersonelUserByPageListComponent],
})
export class PersonelUserByPageListTab {}
