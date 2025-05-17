import { Component } from '@angular/core';
import { PersonelUserCoverLetterDeletedListComponent } from '../personelUserCoverLetterDeletedList/personelUserCoverLetterDeletedList.component';

@Component({
  selector: 'app-personelUserCoverLetter-deleted-list-tab',
  template: `<div class="card-body">
    <app-personelUserCoverLetterDeletedList></app-personelUserCoverLetterDeletedList>
  </div> `,
  imports: [PersonelUserCoverLetterDeletedListComponent],
})
export class PersonelUserCoverLetterDeletedListTab {}
