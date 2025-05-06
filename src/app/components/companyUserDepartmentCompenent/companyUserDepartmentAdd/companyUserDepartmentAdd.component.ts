import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
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
import { CompanyUserDepartment } from '../../../models/companyUserDepartment';
import { CompanyUserService } from '../../../services/companyUser.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { AuthService } from '../../../services/auth.service';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CaseService } from '../../../services/case.service';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserDepartmentAdd',
  templateUrl: './companyUserDepartmentAdd.component.html',
  styleUrls: ['./companyUserDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserDepartmentAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Company User Department Form';
  companyUsers: CompanyUserDTO[] = [];
  users: UserDTO[] = [];
  userId: number;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private companyUserService: CompanyUserService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getUsers();
    this.getCompanyUsers();
    this.checkAdmin();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  checkAdmin() {
    if (this.authService.isAdmin('status')) {
      this.isAdmin = true;
    }
  }
  add() {
    if (this.addForm.valid && this.getModel().companyUserId > 0) {
      this.companyUserDepartmentService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/companyuserdepartments']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUserDepartment {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      companyUserId: this.getCompanyUserId(this.addForm.value.companyUserName),
      companyUserName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.companyUserName
      ),

      departmentName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.departmentName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data.filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    const userId = this.getUserId(this.addForm.value.userEmail);

    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUsers = response.data
          .filter((f) => f.companyUserId == userId)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getCompanyUserId(companyUserName: string): number {
    const companyId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getUsers();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getCompanyUsers();
  }

  clearInput3() {
    let value = this.addForm.get('departmentName');
    value.reset();
  }
}
