import { Component, Input, OnInit } from '@angular/core';
import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { Department } from '../../../models/component/department';
import { CompanyUserDepartmentDTO } from '../../../models/dto/companyUserDepartmentDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { DepartmentService } from '../../../services/department.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

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
  departments: Department[] = [];
  admin: boolean = false;
  componentTitle = 'Company User Department Update Form';

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private toastrService: ToastrService,
    private router: Router,
    private departmentService: DepartmentService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getDepartments();
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
      departmentId: this.getDepartmentId(
        this.companyUserDepartmentDTO.departmentName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data
          .filter((c) => c.isCompany === true)
          .filter((f) => f.departmentName != '-');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getDepartmentId(departmentName: string): string {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  departmentNameClear() {
    this.companyUserDepartmentDTO.departmentName = '';
  }
}
