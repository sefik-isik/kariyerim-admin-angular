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
import { Router, RouterLink } from '@angular/router';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { UserDTO } from '../../../models/userDTO';
import { UserOperationClaim } from '../../../models/userOperationClaim';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { OperationClaim } from '../../../models/operationClaim';
import { OperationClaimService } from '../../../services/operationClaim.service';

@Component({
  selector: 'app-userOperationClaimAdd',
  templateUrl: './userOperationClaimAdd.component.html',
  styleUrls: ['./userOperationClaimAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UserOperationClaimAddComponent implements OnInit {
  addForm: FormGroup;
  users: UserDTO[] = [];
  operationClaims: OperationClaim[];
  userId: number;

  componentTitle = 'Add User Operation Claim Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private userOperationClaimService: UserOperationClaimService,
    private adminService: AdminService,
    private userService: UserService,
    private authService: AuthService,
    private operationClaimService: OperationClaimService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      claimName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }

    if (this.addForm.valid && this.getModel()) {
      this.userOperationClaimService.add(this.getModel()).subscribe(
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
      userId: this.getUserId(this.addForm.value.userEmail),
      operationClaimId: this.getOperaionClaimId(this.addForm.value.claimName),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
      (response) => {
        this.getUsers(response);
        this.getUserOperationClaims(response);
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
    this.operationClaimService.getAll(adminModel).subscribe(
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
    let value = this.addForm.get('userEmail');
    value.reset();
  }

  clearInput2() {
    let value = this.addForm.get('claimName');
    value.reset();
  }
}
