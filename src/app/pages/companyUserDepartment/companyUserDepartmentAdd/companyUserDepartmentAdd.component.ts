import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { ValidationService } from '../../../services/validation.service';

import { AuthService } from '../../../services/auth.service';
import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';

@Component({
  selector: 'app-companyUserDepartmentAdd',
  templateUrl: './companyUserDepartmentAdd.component.html',
  styleUrls: ['./companyUserDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserDepartmentAddComponent implements OnInit {
  companyUserDepartmentModel: CompanyUserDepartment =
    {} as CompanyUserDepartment;
  companyUserDepartments: CompanyUserDepartment[] = [];
  admin: boolean = false;
  componentTitle = 'Company User Department Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();

    this.getCompanyUserDepartments();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserDepartmentService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuserdepartment/companyuserdepartmentlisttab',
          ]);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUserDepartment {
    return Object.assign({
      id: '',
      departmentName: this.companyUserDepartmentModel.departmentName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCompanyUserDepartments() {
    this.companyUserDepartmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDepartments = response.data.filter(
          (f) => f.departmentName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  departmentNameClear() {
    this.companyUserDepartmentModel.departmentName = '';
  }
}
