import { CaseService } from '../../../services/helperServices/case.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-workingMethodUpdate',
  templateUrl: './workingMethodUpdate.component.html',
  styleUrls: ['./workingMethodUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class WorkingMethodUpdateComponent implements OnInit {
  @Input() workingMethod: WorkingMethod;
  componentTitle = 'Working Method Update Form';

  constructor(
    private workingMethodService: WorkingMethodService,
    private toastrService: ToastrService,
    private router: Router,
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
      this.workingMethodService.update(this.getModel()).subscribe(
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
      id: this.workingMethod.id,
      methodName: this.caseService.capitalizeFirstLetter(
        this.workingMethod.methodName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  methodNameClear() {
    this.workingMethod.methodName = '';
  }
}
