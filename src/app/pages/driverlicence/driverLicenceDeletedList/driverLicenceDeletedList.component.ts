import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DriverLicence } from '../../../models/component/driverLicence';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverLicenceUpdateComponent } from '../driverLicenceUpdate/driverLicenceUpdate.component';
import { DriverLicenceDetailComponent } from '../driverLicenceDetail/driverLicenceDetail.component';
import { ValidationService } from '../../../services/validation.service';

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
    private modalService: NgbModal,
    private validationService: ValidationService
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
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(driverLicence: DriverLicence) {
    this.driverLicenceService.update(driverLicence).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.driverLicences.forEach((driverLicence) => {
      this.driverLicenceService.update(driverLicence).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(driverLicence: DriverLicence) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.driverLicenceService.terminate(driverLicence).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.driverLicences.forEach((driverLicence) => {
      this.driverLicenceService.terminate(driverLicence).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(driverLicence: DriverLicence) {
    const modalRef = this.modalService.open(DriverLicenceUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.driverLicence = driverLicence;
  }

  openDetail(driverLicence: DriverLicence) {
    const modalRef = this.modalService.open(DriverLicenceDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.driverLicence = driverLicence;
  }
}
