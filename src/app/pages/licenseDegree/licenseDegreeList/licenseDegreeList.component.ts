import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { LicenseDegreeService } from '../../../services/licenseDegree.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseDegreeUpdateComponent } from '../licenseDegreeUpdate/licenseDegreeUpdate.component';
import { LicenseDegreeDetailComponent } from '../licenseDegreeDetail/licenceDegreeDetail.component';

@Component({
  selector: 'app-licenseDegreeList',
  templateUrl: './licenseDegreeList.component.html',
  styleUrls: ['./licenseDegreeList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LicenseDegreeListComponent implements OnInit {
  licenseDegrees: LicenseDegree[] = [];
  componentTitle = 'Licence Degree';
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private licenseDegreeService: LicenseDegreeService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getLicenseDegrees();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLicenseDegrees();
      }
    });
  }

  getLicenseDegrees() {
    this.licenseDegreeService.getAll().subscribe(
      (response) => {
        this.licenseDegrees = response.data.filter(
          (f) => f.licenseDegreeName != '-'
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(licenseDegree: LicenseDegree) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.licenseDegreeService.delete(licenseDegree).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
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
    this.licenseDegrees.forEach((licenseDegrees) => {
      this.licenseDegreeService.delete(licenseDegrees).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
}
