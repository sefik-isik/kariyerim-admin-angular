import { FacultyService } from './../../../services/faculty.service';
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
import { University } from '../../../models/university';
import { UniversityDepartment } from '../../../models/universityDepartment';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { UniversityDepartmentDTO } from '../../../models/universityDepartmentDTO';
import { Faculty } from '../../../models/faculty';

@Component({
  selector: 'app-universityDepartmentUpdate',
  templateUrl: './universityDepartmentUpdate.component.html',
  styleUrls: ['./universityDepartmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityDepartmentUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() universityDepartmentDTO: UniversityDepartmentDTO;
  universities: University[];
  faculties: Faculty[];
  departments: Department[];
  universityDepartmentDTOs: UniversityDepartmentDTO[];
  universityDepartmentId: number;
  universityId: number;

  componentTitle = 'University Department Update Form';

  constructor(
    private universityDepartmentService: UniversityDepartmentService,

    private formBuilder: FormBuilder,
    private universityService: UniversityService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private departmentService: DepartmentService,
    private facultyService: FacultyService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.getFaculties();
    this.getDepartments();
    this.createUpdateForm();

    setTimeout(() => {
      this.getById(this.universityDepartmentDTO.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      facultyName: ['', [Validators.required, Validators.minLength(3)]],
      universityName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getById(id: number) {
    this.universityDepartmentService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          departmentName: this.getDepartmentById(response.data.departmentId),
          facultyName: this.getFacultyById(response.data.facultyId),
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
      id: this.universityDepartmentId,
      universityId: this.getUniversityId(this.updateForm.value.universityName),
      facultyId: this.getFacultyId(this.updateForm.value.facultyName),
      departmentId: this.getDepartmentId(this.updateForm.value.departmentName),
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

  getUniversityById(universityId: number): string {
    return this.universities.find((c) => c.id == universityId)?.universityName;
  }

  getDepartmentById(departmentId: number): string {
    return this.departments.find((c) => c.id == departmentId)?.departmentName;
  }

  getFacultyById(facultyId: number): string {
    return this.faculties.find((c) => c.id == facultyId)?.facultyName;
  }

  getUniversityId(universityName: string): number {
    return this.universities.find((c) => c.universityName == universityName)
      ?.id;
  }
  getFacultyId(facultyName: string): number {
    return this.faculties.find((c) => c.facultyName == facultyName)?.id;
  }
  getDepartmentId(departmentName: string): number {
    return this.departments.find((c) => c.departmentName == departmentName)?.id;
  }

  clearInput1() {
    let value = this.updateForm.get('universityName');
    value.reset();
    this.getUniversities();
  }

  clearInput2() {
    let value = this.updateForm.get('facultyName');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('departmentName');
    value.reset();
  }
}
