import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUser } from '../../../models/component/companyUser';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { Department } from '../../../models/component/department';
import { UserDTO } from '../../../models/dto/userDTO';
import { CompanyUserService } from '../../../services/companyUser.service';
import { DepartmentService } from '../../../services/department.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserDepartmentDTO } from './../../../models/dto/companyUserDepartmentDTO';
import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserDepartmentAdd',
  templateUrl: './companyUserDepartmentAdd.component.html',
  styleUrls: ['./companyUserDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserDepartmentAddComponent implements OnInit {
  companyUserDepartmentModel: CompanyUserDepartmentDTO =
    {} as CompanyUserDepartmentDTO;
  companyUsers: CompanyUser[] = [];
  userDTOs: UserDTO[] = [];
  departments: Department[] = [];
  admin: boolean = false;
  componentTitle = 'Company User Department Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private departmentService: DepartmentService,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getDepartments();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserDepartmentService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuserdepartment/companyuserdepartmentlisttab',
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

  getModel(): CompanyUserDepartment {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.companyUserDepartmentModel.email.trim()),
      companyUserId: this.getCompanyUserId(
        this.companyUserDepartmentModel.companyUserName.trim()
      ),
      departmentId: this.getDepartmentId(
        this.companyUserDepartmentModel.departmentName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserDepartmentModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.companyUserDepartmentModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAll(adminModel).subscribe(
      (response) => {
        this.companyUsers = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data.filter((c) => c.isCompany === true);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.companyUserDepartmentModel.userId;
    }
    return userId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyId;
  }

  getDepartmentId(departmentName: string): string {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  emailClear() {
    this.companyUserDepartmentModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserDepartmentModel.companyUserName = '';
  }

  departmentNameClear() {
    this.companyUserDepartmentModel.departmentName = '';
  }
}
