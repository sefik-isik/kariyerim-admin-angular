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
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-workingMethodAdd',
  templateUrl: './workingMethodAdd.component.html',
  styleUrls: ['./workingMethodAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class WorkingMethodAddComponent implements OnInit {
  workingMethodModel: WorkingMethod = {} as WorkingMethod;
  componentTitle = 'Working Method Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private workingMethodService: WorkingMethodService,
    private caseService: CaseService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.workingMethodService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/workingmethod/workingmethodlisttab',
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

  getModel(): WorkingMethod {
    return Object.assign({
      id: '',
      methodName: this.caseService.capitalizeFirstLetter(
        this.workingMethodModel.methodName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  methodNameClear() {
    this.workingMethodModel.methodName = '';
  }
}
