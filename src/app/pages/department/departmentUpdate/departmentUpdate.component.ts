import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/component/department';
import { DepartmentService } from '../../../services/department.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-departmentUpdate',
  templateUrl: './departmentUpdate.component.html',
  styleUrls: ['./departmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentUpdateComponent implements OnInit {
  @Input() department: Department;
  departments: Department[];

  componentTitle = 'Department Update Form';

  constructor(
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getById(this.department.id);
    }, 200);
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  getById(id: string) {
    this.departmentService.getById(id).subscribe(
      (response) => {
        this.department.id = response.data.id;
      },
      (responseError) => console.error
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.departmentService.update(this.getModel()).subscribe(
        (response) => {
          console.log(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/department/departmentlisttab']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Department {
    return Object.assign({
      id: this.department.id,
      departmentName: this.department.departmentName,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  departmentNameClear() {
    this.department.departmentName = '';
  }
}
