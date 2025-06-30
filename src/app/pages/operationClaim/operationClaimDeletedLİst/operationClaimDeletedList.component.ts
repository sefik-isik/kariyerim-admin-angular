import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from '../../../models/component/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { AdminService } from '../../../services/helperServices/admin.service';

import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationClaimUpdateComponent } from '../operationClaimUpdate/operationClaimUpdate.component';
import { OperationClaimDetailComponent } from '../operationClaimDetail/operationClaimDetail.component';

@Component({
  selector: 'app-operationClaimDeletedList',
  templateUrl: './operationClaimDeletedList.component.html',
  styleUrls: ['./operationClaimDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class OperationClaimDeletedListComponent implements OnInit {
  operationClaims: OperationClaim[] = [];

  componentTitle = 'Operation Claims Deleted List';

  constructor(
    private toastrService: ToastrService,
    private operationClaimService: OperationClaimService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getOperationClaims();
      },
      (responseError) => console.error
    );
  }

  getOperationClaims() {
    this.operationClaimService.getDeletedAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(operationClaim: OperationClaim) {
    this.operationClaimService.update(operationClaim).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => console.error
    );
  }

  unDeleteAll() {
    this.operationClaims.forEach((operationClaim) => {
      this.operationClaimService.update(operationClaim).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(operationClaim: OperationClaim) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.operationClaimService.terminate(operationClaim).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.operationClaims.forEach((operationClaim) => {
      this.operationClaimService.terminate(operationClaim).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(operationClaim: OperationClaim) {
    const modalRef = this.modalService.open(OperationClaimUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.operationClaim = operationClaim;
  }

  openDetail(operationClaim: OperationClaim) {
    const modalRef = this.modalService.open(OperationClaimDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.operationClaim = operationClaim;
  }
}
