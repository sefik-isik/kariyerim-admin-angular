import { Component } from '@angular/core';
import { LanguageDeletedListComponent } from '../languageDeletedList/languageDeletedList.component';

@Component({
  selector: 'app-language-deleted-list-tab',
  template: `<div class="card-body">
    <app-languageDeletedList></app-languageDeletedList>
  </div> `,
  imports: [LanguageDeletedListComponent],
})
export class LanguageDeletedListTab {}
