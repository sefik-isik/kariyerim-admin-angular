import { Component } from '@angular/core';
import { PersonelUserCvEducationListComponent } from '../personelUserCvEducationList/personelUserCvEducationList.component';

@Component({
  selector: 'app-personelUserCvEducation-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserCvEducationList></app-personelUserCvEducationList>
    </div>
  `,
  imports: [PersonelUserCvEducationListComponent],
})
export class PersonelUserCvEducationListTab {}
