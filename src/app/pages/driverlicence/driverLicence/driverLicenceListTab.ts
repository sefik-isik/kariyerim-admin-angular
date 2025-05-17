import { Component } from '@angular/core';
import { DriverLicenceListComponent } from '../driverLicenceList/driverLicenceList.component';

@Component({
  selector: 'app-driverLicence-list-tab',
  template: `
    <div class="card-body"><app-driverLicenceList></app-driverLicenceList></div>
  `,
  imports: [DriverLicenceListComponent],
})
export class DriverLicenceListTab {}
