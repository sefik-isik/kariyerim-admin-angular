import { Component } from '@angular/core';
import { LanguageListComponent } from '../languageList/languageList.component';

@Component({
  selector: 'app-language-list-tab',
  template: `
    <div class="card-body"><app-languageList></app-languageList></div>
  `,
  imports: [LanguageListComponent],
})
export class LanguageListTab {}
