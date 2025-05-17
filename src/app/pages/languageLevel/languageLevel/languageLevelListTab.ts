import { Component } from '@angular/core';
import { LanguageLevelListComponent } from '../languageLevelList/languageLevelList.component';

@Component({
  selector: 'app-languageLevel-list-tab',
  template: `
    <div class="card-body"><app-languageLevelList></app-languageLevelList></div>
  `,
  imports: [LanguageLevelListComponent],
})
export class LanguageLevelListTab {}
