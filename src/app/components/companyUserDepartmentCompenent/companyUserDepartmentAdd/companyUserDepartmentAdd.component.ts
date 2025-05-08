import { AdminModel } from './../../../models/adminModel';
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
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CaseService } from '../../../services/case.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-companyUserDepartmentAdd',
  templateUrl: './companyUserDepartmentAdd.component.html',
  styleUrls: ['./companyUserDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserDepartmentAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Company User Department Add Form';
  companyUserDTOs: CompanyUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  userId: number;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private caseService: CaseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
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

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (error) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.addForm.value.userEmail);

    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data.filter((f) => f.userId === userId);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    return userId;
  }

  getCompanyUserId(companyUserName: string): number {
    const companyId = this.companyUserDTOs.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('departmentName');
    value.reset();
  }
}
