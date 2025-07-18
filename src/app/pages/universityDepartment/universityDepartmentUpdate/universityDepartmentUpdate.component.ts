import { FacultyService } from './../../../services/faculty.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { University } from '../../../models/component/university';
import { UniversityDepartment } from '../../../models/component/universityDepartment';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityService } from '../../../services/university.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../models/component/department';
import { DepartmentService } from '../../../services/department.service';
import { UniversityDepartmentDTO } from '../../../models/dto/universityDepartmentDTO';
import { Faculty } from '../../../models/component/faculty';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-universityDepartmentUpdate',
  templateUrl: './universityDepartmentUpdate.component.html',
  styleUrls: ['./universityDepartmentUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UniversityDepartmentUpdateComponent implements OnInit {
  @Input() universityDepartmentDTO: UniversityDepartmentDTO;
  universities: University[];
  faculties: Faculty[];
  departments: Department[];
  universityDepartmentDTOs: UniversityDepartmentDTO[];
  componentTitle = 'University Department Update Form';

  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private universityService: UniversityService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
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
      this.universityDepartmentService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/universitydepartment/universitydepartmentlisttab',
          ]);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): UniversityDepartment {
    return Object.assign({
      id: this.universityDepartmentDTO.id,
      universityId: this.getUniversityId(
        this.universityDepartmentDTO.universityName.trim()
      ),
      facultyId: this.getFacultyId(
        this.universityDepartmentDTO.facultyName.trim()
      ),
      departmentId: this.getDepartmentId(
        this.universityDepartmentDTO.departmentName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universities = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.faculties = response.data.filter((f) => f.facultyName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.departments = response.data
          .filter((c) => c.isCompany === false)
          .filter((f) => f.departmentName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityId(universityName: string): string {
    return this.universities.find((c) => c.universityName == universityName)
      ?.id;
  }
  getFacultyId(facultyName: string): string {
    return this.faculties.find((c) => c.facultyName == facultyName)?.id;
  }
  getDepartmentId(departmentName: string): string {
    return this.departments.find((c) => c.departmentName == departmentName)?.id;
  }

  universityNameClear() {
    this.universityDepartmentDTO.universityName = '';
  }

  facultyNameClear() {
    this.universityDepartmentDTO.facultyName = '';
  }

  departmentNameClear() {
    this.universityDepartmentDTO.departmentName = '';
  }
}
