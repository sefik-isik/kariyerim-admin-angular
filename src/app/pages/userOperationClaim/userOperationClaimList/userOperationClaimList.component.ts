import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UserOperationClaim } from '../../../models/component/userOperationClaim';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserOperationClaimDTO } from '../../../models/dto/userOperationClaimDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/component/operationClaim';
import { FilterUserOperationClaimByUserPipe } from '../../../pipes/filterUserOperationClaimByUser.pipe';
import { FilterUserOperationClaimPipe } from '../../../pipes/filterUserOperationClaim.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOperationClaimUpdateComponent } from '../userOperationClaimUpdate/userOperationClaimUpdate.component';
import { UserOperationClaimDetailComponent } from '../userOperationClaimDetail/userOperationClaimDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-userOperationClaimList',
  templateUrl: './userOperationClaimList.component.html',
  styleUrls: ['./userOperationClaimList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterUserOperationClaimByUserPipe,
    FilterUserOperationClaimPipe,
  ],
})
export class UserOperationClaimListComponent implements OnInit {
  userOperationClaimDTOs: UserOperationClaimDTO[] = [];
  filter1 = '';
  filter2 = '';
  users: UserDTO[];
  operationClaims: OperationClaim[];
  userId: string;
  admin: boolean = false;
  componentTitle = 'User Operation Claims';

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private userOperationClaimService: UserOperationClaimService,
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
        this.getUsers(response);
        this.getUserOperationClaims(response);
        this.getOperaionClaims();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserOperationClaims(adminModel: AdminModel) {
    this.userOperationClaimService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.userOperationClaimDTOs = response.data.filter(
          (f) => f.operationClaimName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.users = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data.filter((f) => f.name != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(userOperationClaim: UserOperationClaim) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.userOperationClaimService.delete(userOperationClaim).subscribe(
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
    this.userOperationClaimDTOs.forEach((userOperationClaim) => {
      this.userOperationClaimService.delete(userOperationClaim).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(userOperationClaimDTO: UserOperationClaimDTO) {
    const modalRef = this.modalService.open(UserOperationClaimUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.userOperationClaimDTO = userOperationClaimDTO;
  }

  openDetail(userOperationClaimDTO: UserOperationClaimDTO) {
    const modalRef = this.modalService.open(UserOperationClaimDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.userOperationClaimDTO = userOperationClaimDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }

  clearInput2() {
    this.filter2 = null;
    this.getAdminValues();
  }
}
