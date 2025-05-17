import { Component } from '@angular/core';
import { PersonelUserFileListComponent } from '../personelUserFileList/personelUserFileList.component';

@Component({
  selector: 'app-personelUserFile-list-tab',
  template: `
    <div class="card-body">
      <app-personelUserFileList></app-personelUserFileList>
    </div>
  `,
  imports: [PersonelUserFileListComponent],
})
export class PersonelUserFileListTab {}
