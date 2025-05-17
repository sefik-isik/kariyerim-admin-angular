import { Component, Input, OnInit } from '@angular/core';
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
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/operationClaim';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-operationClaimUpdate',
  templateUrl: './operationClaimUpdate.component.html',
  styleUrls: ['./operationClaimUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class OperationClaimUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() operationClaim: OperationClaim;
  operationClaimId: number;

  componentTitle = 'Operation Claim Update Form';

  constructor(
    private operationClaimService: OperationClaimService,

    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.operationClaim.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getById(id: number) {
    this.operationClaimService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          name: response.data.name,
        });
        this.operationClaimId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.operationClaimService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/operationclaims']);
        },
        (error) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): OperationClaim {
    return Object.assign({
      id: this.operationClaimId,
      name: this.updateForm.value.name,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('name');
    value.reset();
  }
}
