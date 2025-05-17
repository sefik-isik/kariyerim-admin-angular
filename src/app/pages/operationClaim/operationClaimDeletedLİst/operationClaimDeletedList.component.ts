import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from '../../../models/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { AdminService } from '../../../services/admin.service';

import { LocalStorageService } from '../../../services/localStorage.service';
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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getOperationClaims();
      },
      (error) => console.error
    );
  }

  getOperationClaims() {
    this.operationClaimService.getDeletedAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(operationClaim: OperationClaim) {
    this.operationClaimService.update(operationClaim).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.operationClaims.forEach((operationClaim) => {
      this.operationClaimService.update(operationClaim).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
