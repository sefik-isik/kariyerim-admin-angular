import { CompanyUserDepartmentDTO } from './../../../models/dto/companyUserDepartmentDTO';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { CompanyUserService } from '../../../services/companyUser.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUser } from '../../../models/component/companyUser';
import { ValidationService } from '../../../services/validation.service';

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
  componentTitle = 'Company User Department Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private caseService: CaseService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
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
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUserDepartment {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.companyUserDepartmentModel.email),
      companyUserId: this.getCompanyUserId(
        this.companyUserDepartmentModel.companyUserName
      ),
      departmentName: this.caseService.capitalizeFirstLetter(
        this.companyUserDepartmentModel.departmentName
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
      (responseError) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUsers = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    return userId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyId;
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
