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
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserDTO } from '../../../models/userDTO';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/operationClaim';
import { FilterUserOperationClaimByUserPipe } from '../../../pipes/filterUserOperationClaimByUser.pipe';
import { FilterUserOperationClaimPipe } from '../../../pipes/filterUserOperationClaim.pipe';

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
    private authService: AuthService,
    private userOperationClaimService: UserOperationClaimService,
    private operationClaimService: OperationClaimService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getUserOperationClaims();
    this.getOperaionClaims();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getUserOperationClaims() {
    this.userOperationClaimService.getAllDTO().subscribe(
      (response) => {
        this.userOperationClaimDTOs = response.data.filter(
          (f) => f.deletedDate != null
        );
      },
      (error) => console.error
    );
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data.filter(
          (f) => f.deletedDate == null
        );
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
    this.getUsers();
  }

  clearInput2() {
    this.filter2 = null;
    this.getUserOperationClaims();
  }
}
