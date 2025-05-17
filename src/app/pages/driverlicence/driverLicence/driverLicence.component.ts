import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverLicenceAddComponent } from '../driverLicenceAdd/driverLicenceAdd.component';

@Component({
  selector: 'app-driverLicence',
  templateUrl: './driverLicence.component.html',
  styleUrls: ['./driverLicence.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class DriverLicenceComponent {
  componentTitle = 'Driver Licences';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(DriverLicenceAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
