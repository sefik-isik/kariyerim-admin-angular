import { LocalStorageService } from './../../../services/localStorage.service';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UserOperationClaim } from '../../../models/userOperationClaim';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserOperationClaimDTO } from '../../../models/userOperationClaimDTO';

import { UserDTO } from '../../../models/userDTO';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/operationClaim';
import { FilterUserOperationClaimByUserPipe } from '../../../pipes/filterUserOperationClaimByUser.pipe';
import { FilterUserOperationClaimPipe } from '../../../pipes/filterUserOperationClaim.pipe';

@Component({
  selector: 'app-userOperationClaim',
  templateUrl: './userOperationClaim.component.html',
  styleUrls: ['./userOperationClaim.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterUserOperationClaimByUserPipe,
    FilterUserOperationClaimPipe,
  ],
})
export class UserOperationClaimComponent implements OnInit {
  userOperationClaimDTOs: UserOperationClaimDTO[] = [];
  filter1 = '';
  filter2 = '';
  users: UserDTO[];
  operationClaims: OperationClaim[];
  userId: number;

  componentTitle = 'User Operation Claims';

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private userOperationClaimService: UserOperationClaimService,
    private operationClaimService: OperationClaimService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getUsers(response);
        this.getUserOperationClaims(response);
        this.getOperaionClaims();
      },
      (error) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.users = response.data;
      },
      (error) => console.error
    );
  }

  getUserOperationClaims(adminModel: AdminModel) {
    this.userOperationClaimService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.userOperationClaimDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (error) => console.error
    );
  }

  delete(userOperationClaim: UserOperationClaim) {
    if (!this.authService.isAdmin('status')) {
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
    this.userOperationClaimDTOs.forEach((userOperationClaim) => {
      this.userOperationClaimService.delete(userOperationClaim).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
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
