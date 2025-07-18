import { CaseService } from '../../../services/helperServices/case.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/component/department';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-departmentAdd',
  templateUrl: './departmentAdd.component.html',
  styleUrls: ['./departmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class DepartmentAddComponent implements OnInit {
  departmentModel: Department = {} as Department;
  componentTitle = 'Department Add Form';

  constructor(
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private caseService: CaseService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.departmentService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/department/departmentlisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): Department {
    return Object.assign({
      id: '',
      departmentName: this.caseService.capitalizeFirstLetter(
        this.departmentModel.departmentName.trim()
      ),
      isCompany: this.departmentModel.isCompany,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  departmentNameClear() {
    this.departmentModel.departmentName = '';
  }
}
