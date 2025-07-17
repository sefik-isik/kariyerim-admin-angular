import { Component } from '@angular/core';
import { ExperienceListComponent } from '../experienceList/experienceList.component';

@Component({
  selector: 'app-experience-list-tab',
  template: `<div class="card-body">
    <app-experienceList></app-experienceList>
  </div> `,
  imports: [ExperienceListComponent],
})
export class ExperienceListTab {}
