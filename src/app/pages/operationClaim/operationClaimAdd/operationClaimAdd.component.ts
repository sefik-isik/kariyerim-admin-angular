import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/component/operationClaim';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-operationClaimAdd',
  templateUrl: './operationClaimAdd.component.html',
  styleUrls: ['./operationClaimAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class OperationClaimAddComponent implements OnInit {
  operationClaimModel: OperationClaim = {} as OperationClaim;
  componentTitle = 'Operation Claim Add Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private operationClaimService: OperationClaimService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.operationClaimService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/operationclaim/operationclaimlisttab',
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

  getModel(): OperationClaim {
    return Object.assign({
      id: '',
      name: this.operationClaimModel.name.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  nameClear() {
    this.operationClaimModel.name = '';
  }
}
