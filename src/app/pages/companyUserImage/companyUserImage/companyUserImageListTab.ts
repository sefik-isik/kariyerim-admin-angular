import { Component } from '@angular/core';
import { CompanyUserImageListComponent } from '../companyUserImageList/companyUserImageList.component';

@Component({
  selector: 'app-companyUserImage-list-tab',
  template: `
    <div class="card-body">
      <app-companyUserImageList></app-companyUserImageList>
    </div>
  `,
  imports: [CompanyUserImageListComponent],
})
export class CompanyUserImageListTab {}
