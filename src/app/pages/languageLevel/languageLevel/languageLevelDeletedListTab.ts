import { Component } from '@angular/core';
import { LanguageLevelDeletedListComponent } from '../languageLevelDeletedList/languageLevelDeletedList.component';

@Component({
  selector: 'app-languageLevel-deleted-list-tab',
  template: `<div class="card-body">
    <app-languageLevelDeletedList></app-languageLevelDeletedList>
  </div> `,
  imports: [LanguageLevelDeletedListComponent],
})
export class LanguageLevelDeletedListTab {}
