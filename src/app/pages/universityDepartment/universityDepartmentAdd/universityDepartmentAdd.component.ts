import { DepartmentService } from './../../../services/department.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UniversityService } from '../../../services/university.service';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityDepartment } from '../../../models/component/universityDepartment';
import { University } from '../../../models/component/university';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/component/department';
import { Faculty } from '../../../models/component/faculty';
import { FacultyService } from '../../../services/faculty.service';
import { UniversityDepartmentDTO } from '../../../models/dto/universityDepartmentDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityDepartmentAdd',
  templateUrl: './universityDepartmentAdd.component.html',
  styleUrls: ['./universityDepartmentAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityDepartmentAddComponent implements OnInit {
  universityDepartmentModel: UniversityDepartmentDTO =
    {} as UniversityDepartmentDTO;
  universities: University[];
  faculties: Faculty[];
  departments: Department[];
  componentTitle = 'University Department Add Form';

  constructor(
    private universityService: UniversityService,
    private facultyService: FacultyService,
    private departmentService: DepartmentService,
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversities();
    this.getFaculties();
    this.getDepartments();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.universityDepartmentService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universitydepartment/universitydepartmentlisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UniversityDepartment {
    return Object.assign({
      id: '',
      universityId: this.getUniversityId(
        this.universityDepartmentModel.universityName.trim()
      ),
      facultyId: this.getFacultytId(
        this.universityDepartmentModel.facultyName.trim()
      ),
      departmentId: this.getDepartmentId(
        this.universityDepartmentModel.departmentName.trim()
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data.filter((c) => c.isCompany === false);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUniversityId(universityName: string): string {
    const universityId = this.universities.filter(
      (c) => c.universityName === universityName
    )[0]?.id;

    return universityId;
  }

  getFacultytId(facultyName: string): string {
    const facultytId = this.faculties.filter(
      (c) => c.facultyName === facultyName
    )[0]?.id;

    return facultytId;
  }

  getDepartmentId(departmentName: string): string {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  universityNameClear() {
    this.universityDepartmentModel.universityName = '';
  }

  facultyNameClear() {
    this.universityDepartmentModel.facultyName = '';
  }

  departmentNameClear() {
    this.universityDepartmentModel.departmentName = '';
  }
}
