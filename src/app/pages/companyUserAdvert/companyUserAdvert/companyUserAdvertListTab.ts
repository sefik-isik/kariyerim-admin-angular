import { Component } from "@angular/core";
import { CompanyUserAdvertListComponent } from "../companyUserAdvertList/companyUserAdvertList.component";

@Component({
  selector: "app-companyUserAdvert-list-tab",
  template: `
    <div class="card-body">
      <app-companyUserAdvertList></app-companyUserAdvertList>
    </div>
  `,
  imports: [CompanyUserAdvertListComponent],
})
export class CompanyUserAdvertListTab {}
