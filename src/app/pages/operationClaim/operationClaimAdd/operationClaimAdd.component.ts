import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { OperationClaimService } from '../../../services/operationClaim.service';
import { OperationClaim } from '../../../models/operationClaim';

@Component({
  selector: 'app-operationClaimAdd',
  templateUrl: './operationClaimAdd.component.html',
  styleUrls: ['./operationClaimAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class OperationClaimAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Add Operation Claim Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private operationClaimService: OperationClaimService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.operationClaimService.add(this.getModel()).subscribe(
        (response) => {
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
      name: this.addForm.value.name,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('name');
    value.reset();
  }
}
