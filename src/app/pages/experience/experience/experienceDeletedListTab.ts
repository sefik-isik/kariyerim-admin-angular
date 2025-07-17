import { Component } from '@angular/core';
import { ExperienceDeletedListComponent } from '../experienceDeletedList/experienceDeletedList.component';

@Component({
  selector: 'app-experience-deleted-list-tab',
  template: `<div class="card-body">
    <app-experienceDeletedList></app-experienceDeletedList>
  </div> `,
  imports: [ExperienceDeletedListComponent],
})
export class ExperienceDeletedListTab {}
