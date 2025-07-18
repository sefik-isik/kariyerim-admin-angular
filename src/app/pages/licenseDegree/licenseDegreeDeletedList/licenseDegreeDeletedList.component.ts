import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { LicenseDegreeService } from '../../../services/licenseDegree.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseDegreeUpdateComponent } from '../licenseDegreeUpdate/licenseDegreeUpdate.component';
import { LicenseDegreeDetailComponent } from '../licenseDegreeDetail/licenceDegreeDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-licenseDegreeDeletedList',
  templateUrl: './licenseDegreeDeletedList.component.html',
  styleUrls: ['./licenseDegreeDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LicenseDegreeDeletedListComponent implements OnInit {
  licenseDegrees: LicenseDegree[] = [];

  componentTitle = 'Licence Degree Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private licenseDegreeService: LicenseDegreeService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getLicenseDegrees();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLicenseDegrees();
      }
    });
  }

  getLicenseDegrees() {
    this.licenseDegreeService.getDeletedAll().subscribe(
      (response) => {
        this.licenseDegrees = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(licenseDegree: LicenseDegree) {
    this.licenseDegreeService.update(licenseDegree).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.licenseDegrees.forEach((licenseDegree) => {
      this.licenseDegreeService.update(licenseDegree).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(licenseDegree: LicenseDegree) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.licenseDegreeService.terminate(licenseDegree).subscribe(
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

    this.licenseDegrees.forEach((licenseDegree) => {
      this.licenseDegreeService.terminate(licenseDegree).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(licenseDegree: LicenseDegree) {
    const modalRef = this.modalService.open(LicenseDegreeUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.licenseDegree = licenseDegree;
  }

  openDetail(licenseDegree: LicenseDegree) {
    const modalRef = this.modalService.open(LicenseDegreeDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.licenseDegree = licenseDegree;
  }

  clearInput1() {
    this.filter1 = null;
    this.getLicenseDegrees();
  }
}
