import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { Component, Input, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { CaseService } from '../../../services/helperServices/case.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserDepartmentDTO } from '../../../models/dto/companyUserDepartmentDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserDepartmentUpdate',
  templateUrl: './companyUserDepartmentUpdate.component.html',
  styleUrls: ['./companyUserDepartmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserDepartmentUpdateComponent implements OnInit {
  @Input() companyUserDepartmentDTO: CompanyUserDepartmentDTO;
  companyUsers: CompanyUserDTO[] = [];
  users: UserDTO[] = [];
  componentTitle = 'Company User Department Update Form';

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getUserValues(this.companyUserDepartmentDTO.id);
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
    this.companyUserDepartmentService.getById(adminModel).subscribe(
      (response) => {
        this.companyUserDepartmentDTO.id = response.data.id;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserDepartmentService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.activeModal.close();
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
      id: this.companyUserDepartmentDTO.id,
      userId: this.companyUserDepartmentDTO.userId,
      companyUserId: this.companyUserDepartmentDTO.companyUserId,
      departmentName: this.caseService.capitalizeFirstLetter(
        this.companyUserDepartmentDTO.departmentName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  departmentNameClear() {
    this.companyUserDepartmentDTO.departmentName = '';
  }
}
