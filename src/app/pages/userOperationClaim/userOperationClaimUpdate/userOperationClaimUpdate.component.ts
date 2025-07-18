import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../services/helperServices/admin.service';
import { UserOperationClaimService } from '../../../services/userOperationClaim.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationClaim } from '../../../models/component/operationClaim';
import { UserOperationClaim } from '../../../models/component/userOperationClaim';
import { UserOperationClaimDTO } from '../../../models/dto/userOperationClaimDTO';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-userOperationClaimUpdate',
  templateUrl: './userOperationClaimUpdate.component.html',
  styleUrls: ['./userOperationClaimUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UserOperationClaimUpdateComponent implements OnInit {
  @Input() userOperationClaimDTO: UserOperationClaimDTO;
  operationClaims: OperationClaim[];
  componentTitle = 'Update User Operation Claim Form';

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private userOperationClaimService: UserOperationClaimService,
    private adminService: AdminService,
    private operationClaimService: OperationClaimService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getOperaionClaims();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userOperationClaimService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/useroperationclaim/useroperationclaimlisttab',
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

  getModel(): UserOperationClaim {
    return Object.assign({
      id: this.userOperationClaimDTO.id,
      userId: this.userOperationClaimDTO.userId,
      operationClaimId: this.getOperaionClaimId(
        this.userOperationClaimDTO.operationClaimName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getOperationClaimByClaimId(userOperationClaimId: string): string {
    return this.operationClaims.find((u) => u.id == userOperationClaimId)?.name;
  }

  getOperaionClaims() {
    this.operationClaimService.getAll().subscribe(
      (response) => {
        this.operationClaims = response.data.filter((f) => f.name != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getOperaionClaimId(claimName: string): string {
    const operaionClaimId = this.operationClaims.filter(
      (c) => c.name === claimName
    )[0]?.id;

    return operaionClaimId;
  }

  operationClaimNameClear() {
    this.userOperationClaimDTO.operationClaimName = '';
  }
}
