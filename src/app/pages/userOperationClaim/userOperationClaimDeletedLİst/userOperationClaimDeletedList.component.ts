import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserOperationClaimDTO } from '../../../models/dto/userOperationClaimDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { OperationClaim } from '../../../models/component/operationClaim';
import { FilterUserOperationClaimByUserPipe } from '../../../pipes/filterUserOperationClaimByUser.pipe';
import { FilterUserOperationClaimPipe } from '../../../pipes/filterUserOperationClaim.pipe';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOperationClaimUpdateComponent } from '../userOperationClaimUpdate/userOperationClaimUpdate.component';
import { UserOperationClaimDetailComponent } from '../userOperationClaimDetail/userOperationClaimDetail.component';

@Component({
  selector: 'app-userOperationClaimDeletedList',
  templateUrl: './userOperationClaimDeletedList.component.html',
  styleUrls: ['./userOperationClaimDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterUserOperationClaimByUserPipe,
    FilterUserOperationClaimPipe,
  ],
})
export class UserOperationClaimDeletedListComponent implements OnInit {
  userOperationClaimDTOs: UserOperationClaimDTO[] = [];
  filter1 = '';
  filter2 = '';
  users: UserDTO[];
  operationClaims: OperationClaim[];
  userId: string;

  componentTitle = 'User Operation Claims';

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
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
        this.getUsers(response);
        this.getUserOperationClaims(response);
        this.getOperaionClaims();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.users = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUserOperationClaims(adminModel: AdminModel) {
    this.userOperationClaimService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.userOperationClaimDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(userOperationClaimDTO: UserOperationClaimDTO) {
    this.userOperationClaimService.update(userOperationClaimDTO).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.userOperationClaimDTOs.forEach((userOperationClaimDTO) => {
      this.userOperationClaimService.update(userOperationClaimDTO).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
