import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserDTO } from '../../../models/dto/userDTO';

import { UserOperationClaim } from '../../../models/component/userOperationClaim';
import { UserService } from '../../../services/user.service';
import { OperationClaim } from '../../../models/component/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { UserOperationClaimDTO } from '../../../models/dto/userOperationClaimDTO';

@Component({
  selector: 'app-userOperationClaimUpdate',
  templateUrl: './userOperationClaimUpdate.component.html',
  styleUrls: ['./userOperationClaimUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UserOperationClaimUpdateComponent implements OnInit {
  @Input() userOperationClaimDTO: UserOperationClaimDTO;
  users: UserDTO[] = [];
  operationClaims: OperationClaim[];
  componentTitle = 'Update User Operation Claim Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private userOperationClaimService: UserOperationClaimService,
    private adminService: AdminService,
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getOperaionClaims();
    this.getAdminValues();

    setTimeout(() => {
      this.getUserValues(this.userOperationClaimDTO.id);
    }, 200);
  }

  getUserValues(id: string) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: this.localStorageService.getFromLocalStorage('id'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.userOperationClaimService.getById(adminModel).subscribe(
      (response) => {
        this.userOperationClaimDTO.id = response.data.id;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userOperationClaimService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/useroperationclaim/useroperationclaimlisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UserOperationClaim {
    return Object.assign({
      id: this.userOperationClaimDTO.id,
      userId: this.userOperationClaimDTO.userId,
      operationClaimId: this.getOperaionClaimId(
        this.userOperationClaimDTO.operationClaimName
      ),

      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.userOperationClaimDTO.id).subscribe(
      (response) => {
        this.getUsers(response);
        this.getOperaionClaims();
      },
      (responseError) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.users = response.data;
      },
      (responseError) => console.error
    );
  }

  getEmailByUserId(userId: string): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getOperationClaimByClaimId(userOperationClaimId: string): string {
    return this.operationClaims.find((u) => u.id == userOperationClaimId)?.name;
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getOperaionClaimId(claimName: string): string {
    const operaionClaimId = this.operationClaims.filter(
      (c) => c.name === claimName
    )[0]?.id;

    return operaionClaimId;
  }

  operationClaimNameClear() {
    this.userOperationClaimDTO.operationClaimName = '';
  }
}
