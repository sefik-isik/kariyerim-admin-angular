import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { OperationClaim } from '../../../models/component/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationClaimUpdateComponent } from '../operationClaimUpdate/operationClaimUpdate.component';
import { OperationClaimDetailComponent } from '../operationClaimDetail/operationClaimDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-operationClaimList',
  templateUrl: './operationClaimList.component.html',
  styleUrls: ['./operationClaimList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class OperationClaimListComponent implements OnInit {
  operationClaims: OperationClaim[] = [];
  admin: boolean = false;
  componentTitle = 'Operation Claims';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private operationClaimService: OperationClaimService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
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
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getOperationClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data.filter((f) => f.name != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(operationClaim: OperationClaim) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.operationClaimService.delete(operationClaim).subscribe(
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
    this.operationClaims.forEach((operationClaim) => {
      this.operationClaimService.delete(operationClaim).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(operationClaim: OperationClaim) {
    const modalRef = this.modalService.open(OperationClaimUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.operationClaim = operationClaim;
  }

  openDetail(operationClaim: OperationClaim) {
    const modalRef = this.modalService.open(OperationClaimDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.operationClaim = operationClaim;
  }
}
