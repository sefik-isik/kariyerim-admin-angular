import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserDTO } from '../../../models/userDTO';

import { UserOperationClaim } from '../../../models/userOperationClaim';
import { UserService } from '../../../services/user.service';
import { OperationClaim } from '../../../models/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'app-userOperationClaimUpdate',
  templateUrl: './userOperationClaimUpdate.component.html',
  styleUrls: ['./userOperationClaimUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UserOperationClaimUpdateComponent implements OnInit {
  updateForm: FormGroup;
  users: UserDTO[] = [];
  operationClaims: OperationClaim[];
  userId: number;
  userEmail: string;
  id: number;
  componentTitle = 'Update User Operation Claim Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userOperationClaimService: UserOperationClaimService,
    private adminService: AdminService,
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getOperaionClaims();
    this.getAdminValues();
    this.createUpdateForm();

    this.activatedRoute.params.subscribe((params) => {
      this.getUserValues(params['useroperationclaimId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      claimName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getUserValues(id: number) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.userOperationClaimService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getEmailByUserId(this.userId);

        this.updateForm.patchValue({
          claimName: this.getOperationClaimByClaimId(
            response.data.operationClaimId
          ),
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().operationClaimId > 0
    ) {
      this.userOperationClaimService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/useroperationclaims']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UserOperationClaim {
    return Object.assign({
      id: this.id,
      operationClaimId: this.getOperaionClaimId(
        this.updateForm.value.claimName
      ),
      userId: this.userId,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.id).subscribe(
      (response) => {
        this.getUsers(response);
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

  getEmailByUserId(userId: number): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getOperationClaimByClaimId(userOperationClaimId: number): string {
    return this.operationClaims.find((u) => u.id == userOperationClaimId)?.name;
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data;
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getOperaionClaimId(claimName: string): number {
    const operaionClaimId = this.operationClaims.filter(
      (c) => c.name === claimName
    )[0]?.id;

    return operaionClaimId;
  }

  clearInput1() {
    let cityName = this.updateForm.get('claimName');
    cityName.reset();
    this.getAdminValues();
  }
}
