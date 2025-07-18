import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/component/operationClaim';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-operationClaimUpdate',
  templateUrl: './operationClaimUpdate.component.html',
  styleUrls: ['./operationClaimUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class OperationClaimUpdateComponent implements OnInit {
  @Input() operationClaim: OperationClaim;
  componentTitle = 'Operation Claim Update Form';

  constructor(
    private operationClaimService: OperationClaimService,
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
      this.operationClaimService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/operationclaim/operationclaimlisttab',
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

  getModel(): OperationClaim {
    return Object.assign({
      id: this.operationClaim.id,
      name: this.operationClaim.name.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  nameClear() {
    this.operationClaim.name = '';
  }
}
