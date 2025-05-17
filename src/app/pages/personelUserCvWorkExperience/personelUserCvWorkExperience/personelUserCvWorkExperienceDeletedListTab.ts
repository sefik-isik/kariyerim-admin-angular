import { Component } from '@angular/core';
import { PersonelUserCvWorkExperienceDeletedListComponent } from '../personelUserCvWorkExperienceDeletedList/personelUserCvWorkExperienceDeletedList.component';

@Component({
  selector: 'app-personelUserCvWorkExperience-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserCvWorkExperienceDeletedList></app-personelUserCvWorkExperienceDeletedList>
  </div> `,
  imports: [PersonelUserCvWorkExperienceDeletedListComponent],
})
export class PersonelUserCvWorkExperienceDeletedListTab {}
