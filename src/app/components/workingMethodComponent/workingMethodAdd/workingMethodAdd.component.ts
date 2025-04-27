import { CaseService } from './../../../services/case.service';
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
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { WorkingMethod } from '../../../models/workingMethod';

@Component({
  selector: 'app-workingMethodAdd',
  templateUrl: './workingMethodAdd.component.html',
  styleUrls: ['./workingMethodAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class WorkingMethodAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Add Working Method Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private workingMethodService: WorkingMethodService,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      methodName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.workingMethodService.add(this.getModel()).subscribe(
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
      methodName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.methodName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('methodName');
    value.reset();
  }
}
