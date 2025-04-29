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
import { CaseService } from '../../../services/case.service';
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
    private licenceDegreeService: LicenceDegreeService,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createAddForm();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      licenceDegreeName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm.valid && this.getModel()) {
      this.licenceDegreeService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/licencedegrees']);
        },
        (error) => console.error(error)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): LicenceDegree {
    return Object.assign({
      licenceDegreeName: this.caseService.capitalizeFirstLetter(
        this.addForm.value.licenceDegreeName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.addForm.get('licenceDegreeName');
    value.reset();
  }
}
