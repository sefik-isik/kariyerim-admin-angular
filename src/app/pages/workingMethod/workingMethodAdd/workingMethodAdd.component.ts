import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { ValidationService } from '../../../services/validation.service';
import { WorkingMethodService } from '../../../services/workingMethod.service';

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
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/workingmethod/workingmethodlisttab',
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

  getModel(): WorkingMethod {
    return Object.assign({
      id: '',
      methodName: this.workingMethodModel.methodName.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  methodNameClear() {
    this.workingMethodModel.methodName = '';
  }
}
