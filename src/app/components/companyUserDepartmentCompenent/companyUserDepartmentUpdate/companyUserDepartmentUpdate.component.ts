import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
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
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { CaseService } from '../../../services/case.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-companyUserDepartmentUpdate',
  templateUrl: './companyUserDepartmentUpdate.component.html',
  styleUrls: ['./companyUserDepartmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserDepartmentUpdateComponent implements OnInit {
  updateForm: FormGroup;
  companyUsers: CompanyUserDTO[] = [];
  id: number;
  companyUserId: number;
  companyUserName: string;

  componentTitle = 'Company User Department Update';
  userEmail: string;
  users: UserDTO[] = [];

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getUserValues(params['companyuseraddressId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
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
    this.companyUserDepartmentService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.companyUserId = response.data.companyUserId;
        this.updateForm.patchValue({
          departmentName: response.data.departmentName,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
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
      companyUserId: this.companyUserId,
      departmentName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.departmentName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('departmentName');
    value.reset();
  }
}
