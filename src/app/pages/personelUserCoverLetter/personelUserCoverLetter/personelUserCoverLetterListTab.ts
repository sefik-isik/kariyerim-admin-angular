import { Component } from '@angular/core';
import { PersonelUserCoverLetterListComponent } from '../personelUserCoverLetterList/personelUserCoverLetterList.component';

@Component({
  selector: 'app-personelUserCoverLetter-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserCoverLetterList></app-personelUserCoverLetterList>
    </div>
  `,
  imports: [PersonelUserCoverLetterListComponent],
})
export class PersonelUserCoverLetterListTab {}
