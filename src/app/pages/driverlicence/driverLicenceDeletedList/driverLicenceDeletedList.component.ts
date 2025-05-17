import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DriverLicence } from '../../../models/driverLicence';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverLicenceUpdateComponent } from '../driverLicenceUpdate/driverLicenceUpdate.component';
import { DriverLicenceDetailComponent } from '../driverLicenceDetail/driverLicenceDetail.component';

@Component({
  selector: 'app-driverLicenceDeletedList',
  templateUrl: './driverLicenceDeletedList.component.html',
  styleUrls: ['./driverLicenceDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DriverLicenceDeletedListComponent implements OnInit {
  driverLicences: DriverLicence[] = [];
  componentTitle = 'Driver Licences Deleted List';

  constructor(
    private toastrService: ToastrService,
    private driverLicenceService: DriverLicenceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getDriverLicences();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDriverLicences();
      }
    });
  }

  getDriverLicences() {
    this.driverLicenceService.getDeletedAll().subscribe(
      (response) => {
        this.driverLicences = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(driverLicence: DriverLicence) {
    this.driverLicenceService.update(driverLicence).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.driverLicences.forEach((driverLicence) => {
      this.driverLicenceService.update(driverLicence).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  open(driverLicence: DriverLicence) {
    const modalRef = this.modalService.open(DriverLicenceUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.driverLicence = driverLicence;
  }

  openDetail(driverLicence: DriverLicence) {
    const modalRef = this.modalService.open(DriverLicenceDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.driverLicence = driverLicence;
  }
}
