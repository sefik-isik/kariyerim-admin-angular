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

@Component({
  selector: 'app-driverLicenceList',
  templateUrl: './driverLicenceList.component.html',
  styleUrls: ['./driverLicenceList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DriverLicenceListComponent implements OnInit {
  driverLicences: DriverLicence[] = [];

  componentTitle = 'Driver Licences';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
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
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.driverLicences = response.data;
      },
      (responseError) => console.error
    );
  }

  delete(driverLicence: DriverLicence) {
    if (!this.authService.isAdmin('status')) {
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
      (responseError) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
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
        (responseError) => console.error
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
