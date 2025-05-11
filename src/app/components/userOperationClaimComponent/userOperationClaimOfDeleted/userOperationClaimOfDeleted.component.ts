import { LocalStorageService } from './../../../services/localStorage.service';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserOperationClaimDTO } from '../../../models/userOperationClaimDTO';
import { UserDTO } from '../../../models/userDTO';
import { OperationClaim } from '../../../models/operationClaim';
import { FilterUserOperationClaimByUserPipe } from '../../../pipes/filterUserOperationClaimByUser.pipe';
import { FilterUserOperationClaimPipe } from '../../../pipes/filterUserOperationClaim.pipe';
import { OperationClaimService } from '../../../services/operationClaim.service';

@Component({
  selector: 'app-userOperationClaimOfDeleted',
  templateUrl: './userOperationClaimOfDeleted.component.html',
  styleUrls: ['./userOperationClaimOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterUserOperationClaimByUserPipe,
    FilterUserOperationClaimPipe,
  ],
})
export class UserOperationClaimOfDeletedComponent implements OnInit {
  userOperationClaimDTOs: UserOperationClaimDTO[] = [];
  filter1 = '';
  filter2 = '';
  users: UserDTO[];
  operationClaims: OperationClaim[];
  userId: number;

  componentTitle = 'Deleted User Operation Claims';

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
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
    this.userOperationClaimService.getAllDeletedDTO(adminModel).subscribe(
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

  unDelete(userOperationClaimDTO: UserOperationClaimDTO) {
    this.userOperationClaimService.update(userOperationClaimDTO).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.userOperationClaimDTOs.forEach((userOperationClaimDTO) => {
      this.userOperationClaimService.update(userOperationClaimDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
