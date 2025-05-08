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
import { UniversityService } from '../../../services/university.service';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityDepartment } from '../../../models/universityDepartment';
import { University } from '../../../models/university';

@Component({
  selector: 'app-universityDepartmentAdd',
  templateUrl: './universityDepartmentAdd.component.html',
  styleUrls: ['./universityDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class UniversityDepartmentAddComponent implements OnInit {
  addForm1: FormGroup;
  universities: University[];

  componentTitle = 'University Department Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private caseService: CaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getUniversities();
  }

  createAddForm() {
    this.addForm1 = this.formBuilder.group({
      universityName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (this.addForm1.valid && this.getModel().universityId > 0) {
      this.universityDepartmentService.add(this.getModel()).subscribe(
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
      departmentName: this.caseService.capitalizeFirstLetter(
        this.addForm1.value.departmentName
      ),
      universityId: this.getUniversityId(this.addForm1.value.universityName),
      createDate: new Date(Date.now()).toJSON(),
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

  getUniversityId(universityName: string): number {
    const universityId = this.universities.filter(
      (c) => c.universityName === universityName
    )[0]?.id;

    return universityId;
  }

  clearInput1() {
    let value = this.addForm1.get('universityName');
    value.reset();
    this.getUniversities();
  }

  clearInput2() {
    let value = this.addForm1.get('departmentName');
    value.reset();
  }
}
