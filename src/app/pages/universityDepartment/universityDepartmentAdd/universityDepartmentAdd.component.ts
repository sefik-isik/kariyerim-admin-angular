import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDepartment } from '../../../models/component/universitydepartment';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-departmentAdd',
  templateUrl: './universityDepartmentAdd.component.html',
  styleUrls: ['./universityDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityDepartmentAddComponent implements OnInit {
  universityDepartmentModel: UniversityDepartment = {} as UniversityDepartment;
  componentTitle = 'Department Add Form';

  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
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
      this.universityDepartmentService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universitydepartment/universitydepartmentlisttab',
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

  getModel(): UniversityDepartment {
    return Object.assign({
      id: '',
      departmentName: this.universityDepartmentModel.departmentName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  departmentNameClear() {
    this.universityDepartmentModel.departmentName = '';
  }
}
