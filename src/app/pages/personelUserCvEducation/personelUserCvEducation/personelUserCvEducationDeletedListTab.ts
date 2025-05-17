import { Component } from '@angular/core';
import { PersonelUserCvEducationDeletedListComponent } from '../personelUserCvEducationDeletedList/personelUserCvEducationDeletedList.component';

@Component({
  selector: 'app-personelUserCvEducation-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserCvEducationDeletedList></app-personelUserCvEducationDeletedList>
  </div> `,
  imports: [PersonelUserCvEducationDeletedListComponent],
})
export class PersonelUserCvEducationDeletedListTab {}
