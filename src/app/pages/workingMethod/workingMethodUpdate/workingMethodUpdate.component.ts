import { CaseService } from './../../../services/case.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { WorkingMethod } from '../../../models/workingMethod';

@Component({
  selector: 'app-workingMethodUpdate',
  templateUrl: './workingMethodUpdate.component.html',
  styleUrls: ['./workingMethodUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class WorkingMethodUpdateComponent implements OnInit {
  updateForm: FormGroup;
  workingMethodId: number;

  componentTitle = ' Working Method Update';

  constructor(
    private workingMethodService: WorkingMethodService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['workingmethodId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      methodName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.workingMethodService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          methodName: response.data.methodName,
        });
        this.workingMethodId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.workingMethodService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/workingmethods']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): WorkingMethod {
    return Object.assign({
      id: this.workingMethodId,
      methodName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.methodName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('methodName');
    value.reset();
  }
}
