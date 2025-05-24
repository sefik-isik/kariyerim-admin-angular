import { DepartmentService } from './../../../services/department.service';
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
import { Router } from '@angular/router';
import { UniversityService } from '../../../services/university.service';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityDepartment } from '../../../models/universityDepartment';
import { University } from '../../../models/university';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/department';
import { Faculty } from '../../../models/faculty';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-universityDepartmentAdd',
  templateUrl: './universityDepartmentAdd.component.html',
  styleUrls: ['./universityDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityDepartmentAddComponent implements OnInit {
  addForm: FormGroup;
  universities: University[];
  faculties: Faculty[];
  departments: Department[];
  componentTitle = 'University Department Add Form';

  constructor(
    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private departmentService: DepartmentService,
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getUniversities();
    this.getFaculties();
    this.getDepartments();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      universityName: ['', [Validators.required, Validators.minLength(3)]],
      facultyName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  add() {
    if (
      this.addForm.valid &&
      this.getModel().universityId > 0 &&
      this.getModel().facultyId > 0 &&
      this.getModel().departmentId > 0
    ) {
      this.universityDepartmentService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universitydepartment/universitydepartmentlisttab',
          ]);
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
      universityId: this.getUniversityId(this.addForm.value.universityName),
      facultyId: this.getFacultytId(this.addForm.value.facultyName),
      departmentId: this.getDepartmentId(this.addForm.value.departmentName),
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

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data;
      },
      (error) => console.error
    );
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data;
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

  getFacultytId(facultyName: string): number {
    const facultytId = this.faculties.filter(
      (c) => c.facultyName === facultyName
    )[0]?.id;

    return facultytId;
  }

  getDepartmentId(departmentName: string): number {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  clearInput1() {
    let value = this.addForm.get('universityName');
    value.reset();
    this.getUniversities();
  }

  clearInput2() {
    let value = this.addForm.get('departmentName');
    value.reset();
  }
}
