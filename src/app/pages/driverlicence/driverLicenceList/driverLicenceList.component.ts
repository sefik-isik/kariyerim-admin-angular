import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

import { DriverLicence } from '../../../models/component/driverLicence';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverLicenceUpdateComponent } from '../driverLicenceUpdate/driverLicenceUpdate.component';
import { DriverLicenceDetailComponent } from '../driverLicenceDetail/driverLicenceDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-driverLicenceList',
  templateUrl: './driverLicenceList.component.html',
  styleUrls: ['./driverLicenceList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DriverLicenceListComponent implements OnInit {
  driverLicences: DriverLicence[] = [];
  componentTitle = 'Driver Licences';
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private driverLicenceService: DriverLicenceService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getDriverLicences();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDriverLicences();
      }
    });
  }

  getDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.driverLicences = response.data.filter(
          (f) => f.driverLicenceName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(driverLicence: DriverLicence) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.driverLicenceService.delete(driverLicence).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.driverLicences.forEach((driverLicences) => {
      this.driverLicenceService.delete(driverLicences).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
