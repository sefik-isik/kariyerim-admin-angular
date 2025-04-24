import { LicenceDegree } from './../../../models/licenceDegree';
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

import { LicenceDegreeService } from '../../../services/licenseDegree.service';

@Component({
  selector: 'app-licenceDegreeAdd',
  templateUrl: './licenceDegreeAdd.component.html',
  styleUrls: ['./licenceDegreeAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class LicenceDegreeAddComponent implements OnInit {
  addForm: FormGroup;
  componentTitle = 'Add Licence Degree Form';

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private licenceDegreeService: LicenceDegreeService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      licenceName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.licenceDegreeService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/licencedegrees']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): LicenceDegree {
    return Object.assign({
      licenceName: this.addForm.value.licenceName,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('licenceName');
    value.reset();
  }
}
