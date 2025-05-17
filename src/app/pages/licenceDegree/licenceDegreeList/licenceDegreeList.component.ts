import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { LicenceDegree } from '../../../models/licenceDegree';
import { LicenceDegreeService } from '../../../services/licenseDegree.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceDegreeUpdateComponent } from '../licenceDegreeUpdate/licenceDegreeUpdate.component';
import { LicenceDegreeDetailComponent } from '../licenceDegreeDetail/licenceDegreeDetail.component';

@Component({
  selector: 'app-licenceDegreeList',
  templateUrl: './licenceDegreeList.component.html',
  styleUrls: ['./licenceDegreeList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LicenceDegreeListComponent implements OnInit {
  licenceDegrees: LicenceDegree[] = [];

  componentTitle = 'Licence Degree';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private licenceDegreeService: LicenceDegreeService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getLicenceDegrees();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLicenceDegrees();
      }
    });
  }

  getLicenceDegrees() {
    this.licenceDegreeService.getAll().subscribe(
      (response) => {
        this.licenceDegrees = response.data;
      },
      (error) => console.error
    );
  }

  delete(licenceDegree: LicenceDegree) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.licenceDegreeService.delete(licenceDegree).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (error) => console.error
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
    this.licenceDegrees.forEach((licenceDegrees) => {
      this.licenceDegreeService.delete(licenceDegrees).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(licenceDegree: LicenceDegree) {
    const modalRef = this.modalService.open(LicenceDegreeUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.licenceDegree = licenceDegree;
  }

  openDetail(licenceDegree: LicenceDegree) {
    const modalRef = this.modalService.open(LicenceDegreeDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.licenceDegree = licenceDegree;
  }
}
