import { Component } from '@angular/core';
import { DriverLicenceDeletedListComponent } from '../driverLicenceDeletedList/driverLicenceDeletedList.component';

@Component({
  selector: 'app-driverLicence-deleted-list-tab',
  template: `<div class="card-body">
    <app-driverLicenceDeletedList></app-driverLicenceDeletedList>
  </div> `,
  imports: [DriverLicenceDeletedListComponent],
})
export class DriverLicenceDeletedListTab {}
