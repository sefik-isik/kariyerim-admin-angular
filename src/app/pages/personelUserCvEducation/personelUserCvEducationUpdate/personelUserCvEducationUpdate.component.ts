import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { Department } from '../../../models/component/department';
import { Faculty } from '../../../models/component/faculty';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { University } from '../../../models/component/university';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { DepartmentService } from '../../../services/department.service';
import { FacultyService } from '../../../services/faculty.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { UniversityService } from '../../../services/university.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserCvEducationUpdate',
  templateUrl: './personelUserCvEducationUpdate.component.html',
  styleUrls: ['./personelUserCvEducationUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvEducationUpdateComponent implements OnInit {
  @Input() personelUserCvEducationDTO: PersonelUserCvEducationDTO;
  universities: University[] = [];
  faculties: Faculty[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  departments: Department[] = [];
  detailCount: number;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Cv Education Update Form';

  constructor(
    private personelUserCvEducationService: PersonelUserCvEducationService,
    private universityService: UniversityService,
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getUniversities();
    this.getUniversityDepartments();
    this.getFaculties();

    setTimeout(() => {
      this.getUserValues(this.personelUserCvEducationDTO.id);
    }, 200);
  }

  getUserValues(id: string) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: this.localStorageService.getFromLocalStorage('id'),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.personelUserCvEducationService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserCvEducationDTO.startDate = this.formatDate(
          response.data.startDate
        );
        this.personelUserCvEducationDTO.endDate = this.formatDate(
          response.data.endDate
        );
        if (this.personelUserCvEducationDTO.endDate == '1899-12-31') {
          this.endDateClear();
        }
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvEducationService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercveducation/personelusercveducationlisttab',
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

  getModel(): PersonelUserCvEducationDTO {
    return Object.assign({
      id: this.personelUserCvEducationDTO.id,
      userId: this.personelUserCvEducationDTO.userId,
      personelUserId: this.personelUserCvEducationDTO.personelUserId,
      cvId: this.personelUserCvEducationDTO.cvId,
      universityId: this.getUniversityId(
        this.personelUserCvEducationDTO.universityName
      ),
      facultyId: this.getFacultyId(this.personelUserCvEducationDTO.facultyName),
      departmentId: this.getepartmentId(
        this.personelUserCvEducationDTO.departmentName
      ),
      educationInfo: this.personelUserCvEducationDTO.educationInfo,
      startDate: new Date(this.personelUserCvEducationDTO.startDate).toJSON(),
      endDate: new Date(
        this.setNullDateValue(this.personelUserCvEducationDTO.endDate)
      ).toJSON(),
      detail: this.personelUserCvEducationDTO.detail,
      abandonment: this.personelUserCvEducationDTO.abandonment,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  setNullDateValue(value: string) {
    if (value == null || value == '') {
      value = '01.01.1900';
    }
    return value;
  }

  count() {
    this.detailCount = this.personelUserCvEducationDTO.detail.length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data.filter((f) => f.facultyName != '-');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUniversityDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data
          .filter((c) => c.isCompany === false)
          .filter((f) => f.departmentName != '-');
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

  getFacultyId(facultyName: string): string {
    const facultyId = this.faculties.filter(
      (c) => c.facultyName === facultyName
    )[0]?.id;

    return facultyId;
  }

  getepartmentId(departmentName: string): string {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  universityNameClear() {
    this.personelUserCvEducationDTO.universityName = '';
  }

  facultyNameClear() {
    this.personelUserCvEducationDTO.facultyName = '';
  }

  departmentNameClear() {
    this.personelUserCvEducationDTO.departmentName = '';
  }

  startDateClear() {
    this.personelUserCvEducationDTO.startDate = '';
  }

  endDateClear() {
    this.personelUserCvEducationDTO.endDate = '';
  }

  detailClear() {
    this.personelUserCvEducationDTO.detail = '';
  }

  educationInfoClear() {
    this.personelUserCvEducationDTO.educationInfo = '';
  }
}
