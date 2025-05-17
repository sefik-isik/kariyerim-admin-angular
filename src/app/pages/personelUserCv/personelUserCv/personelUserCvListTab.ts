import { Component } from '@angular/core';
import { PersonelUserCvListComponent } from '../personelUserCvList/personelUserCvList.component';

@Component({
  selector: 'app-personelUserCv-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserCvList></app-personelUserCvList>
    </div>
  `,
  imports: [PersonelUserCvListComponent],
})
export class PersonelUserCvListTab {}
