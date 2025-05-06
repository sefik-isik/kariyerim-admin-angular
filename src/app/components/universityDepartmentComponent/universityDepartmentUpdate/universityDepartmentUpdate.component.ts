import { City } from './../../../models/city';
import { Country } from './../../../models/country';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CityService } from '../../../services/city.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../services/country.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CaseService } from '../../../services/case.service';
import { University } from '../../../models/university';
import { UniversityDepartment } from '../../../models/universityDepartment';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';

@Component({
  selector: 'app-universityDepartmentUpdate',
  templateUrl: './universityDepartmentUpdate.component.html',
  styleUrls: ['./universityDepartmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UniversityDepartmentUpdateComponent implements OnInit {
  updateForm: FormGroup;
  universities: University[];
  universityDepartments: UniversityDepartment[];
  universityDepartmentId: number;
  universityId: number;
  componentTitle = 'University Department Update';

  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private toastrService: ToastrService,
    private router: Router,
    private caseService: CaseService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.createUpdateForm();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['universitydepartmentId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      universityName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.universityDepartmentService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          departmentName: response.data.departmentName,
          universityName: this.getUniversityById(response.data.universityId),
        });
        this.universityDepartmentId = response.data.id;
        this.universityId = response.data.universityId;
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid && this.getModel().universityId > 0) {
      this.universityDepartmentService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/universitydepartments']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UniversityDepartment {
    return Object.assign({
      id: this.universityDepartmentId,
      universityId: this.getUniversityId(this.updateForm.value.universityName),
      departmentName: this.caseService.capitalizeFirstLetter(
        this.updateForm.value.departmentName
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data;
      },
      (error) => console.error
    );
  }

  getUniversityById(universityId: number): string {
    return this.universities.find((c) => c.id == universityId)?.universityName;
  }

  getUniversityId(universityName: string): number {
    return this.universities.find((c) => c.universityName == universityName)
      ?.id;
  }

  clearInput1() {
    let value = this.updateForm.get('universityName');
    value.reset();
    this.getUniversities();
  }

  clearInput2() {
    let value = this.updateForm.get('departmentName');
    value.reset();
  }
}
