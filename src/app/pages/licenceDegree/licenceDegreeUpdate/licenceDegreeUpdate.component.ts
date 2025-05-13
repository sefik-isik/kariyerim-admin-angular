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

import { LicenceDegree } from '../../../models/licenceDegree';
import { LicenceDegreeService } from '../../../services/licenseDegree.service';

@Component({
  selector: 'app-licenceDegreeUpdate',
  templateUrl: './licenceDegreeUpdate.component.html',
  styleUrls: ['./licenceDegreeUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class LicenceDegreeUpdateComponent implements OnInit {
  updateForm: FormGroup;
  licenceDegreeId: number;

  componentTitle = 'Licence Degree Update';

  constructor(
    private licenceDegreeService: LicenceDegreeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getById(params['licencedegreeId']);
    });
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      LicenceDegreeName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.licenceDegreeService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          LicenceDegreeName: response.data.licenceDegreeName,
        });
        this.licenceDegreeId = id;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid) {
      this.licenceDegreeService.update(this.getModel()).subscribe(
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
      id: this.licenceDegreeId,
      LicenceDegreeName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.LicenceDegreeName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  clearInput1() {
    let value = this.updateForm.get('LicenceDegreeName');
    value.reset();
  }
}
