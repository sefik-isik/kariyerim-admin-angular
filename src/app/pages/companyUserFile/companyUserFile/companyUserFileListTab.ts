import { Component } from '@angular/core';
import { CompanyUserFileComponent } from '../companyUserFileList/companyUserFileList.component';

@Component({
  selector: 'app-companyUserFile-list-tab',
  template: `
    <div class="card-body">
      <app-companyUserFileList></app-companyUserFileList>
    </div>
  `,
  imports: [CompanyUserFileComponent],
})
export class CompanyUserFileListTab {}
