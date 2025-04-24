import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompanyUserDepartment } from '../../../models/companyUserDepartment';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-companyUserDepartmentUpdate',
  templateUrl: './companyUserDepartmentUpdate.component.html',
  styleUrls: ['./companyUserDepartmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserDepartmentUpdateComponent implements OnInit {
  uptadeForm: FormGroup;
  companyUsers: CompanyUserDTO[] = [];
  id: number;
  companyUserId: number;
  companyUserName: string;
  componentTitle = 'Company User Department Update';
  userId: number;
  userEmail: string;
  users: UserDTO[] = [];

  constructor(
    private companyUserService: CompanyUserService,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyUsers();
    this.createUpdateForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['companyuseraddressId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.uptadeForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.companyUserDepartmentService.getById(id).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getEmailByUserId(this.userId);

        this.companyUserId = response.data.companyUserId;
        this.companyUserName = this.getCompanyUserById(this.userId);

        this.uptadeForm.patchValue({
          userEmail: this.userEmail,
          departmentName: response.data.departmentName,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.uptadeForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().companyUserId > 0
    ) {
      this.companyUserDepartmentService.update(this.getModel()).subscribe(
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
      id: this.id,
      userId: this.userId,
      companyUserId: this.companyUserId,
      companyUserName: this.companyUserName,
      departmentName: this.uptadeForm.value.departmentName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
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

  getCompanyUsers() {
    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUsers = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )[0]?.id;

    return userId;
  }

  getEmailByUserId(userId: number): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getCompanyUserById(companyUserId: number): string {
    return this.companyUsers.find((c) => c.companyUserId == companyUserId)
      ?.companyUserName;
  }

  getCompanyUserId(companyUserName: string): number {
    return this.companyUsers.find(
      (c) =>
        c.companyUserName.toLocaleLowerCase() ==
        companyUserName.toLocaleLowerCase()
    )?.id;
  }
  clearInput1() {
    let value = this.uptadeForm.get('departmentName');
    value.reset();
  }
}
