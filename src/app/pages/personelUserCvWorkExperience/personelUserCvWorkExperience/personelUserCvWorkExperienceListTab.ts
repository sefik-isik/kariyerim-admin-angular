import { Component } from '@angular/core';
import { PersonelUserCvWorkExperienceListComponent } from '../personelUserCvWorkExperienceList/personelUserCvWorkExperienceList.component';

@Component({
  selector: 'app-personelUserCvWorkExperience-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserCvWorkExperienceList></app-personelUserCvWorkExperienceList>
    </div>
  `,
  imports: [PersonelUserCvWorkExperienceListComponent],
})
export class PersonelUserCvWorkExperienceListTab {}
