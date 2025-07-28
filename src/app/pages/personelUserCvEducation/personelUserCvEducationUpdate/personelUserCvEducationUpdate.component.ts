import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { University } from '../../../models/component/university';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { UniversityService } from '../../../services/university.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';
import { UniversityFaculty } from '../../../models/component/universityFaculty';
import { UniversityDepartment } from '../../../models/component/universitydepartment';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityFacultyService } from '../../../services/universityFaculty.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-personelUserCvEducationUpdate',
  templateUrl: './personelUserCvEducationUpdate.component.html',
  styleUrls: ['./personelUserCvEducationUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PersonelUserCvEducationUpdateComponent implements OnInit {
  @Input() personelUserCvEducationDTO: PersonelUserCvEducationDTO;
  universities: University[] = [];
  universityFaculties: UniversityFaculty[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  universityDepartments: UniversityDepartment[] = [];
  editorCount: number = 0;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Cv Education Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private personelUserCvEducationService: PersonelUserCvEducationService,
    private universityService: UniversityService,
    private universityDepartmentService: UniversityDepartmentService,
    private universityFacultyService: UniversityFacultyService,
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
        this.validationService.handleSuccesses(response);
        this.personelUserCvEducationDTO.startDate = this.formatDate(
          response.data.startDate
        );
        this.personelUserCvEducationDTO.endDate = this.formatDate(
          response.data.endDate
        );
        if (this.personelUserCvEducationDTO.endDate == '1899-12-31') {
          this.endDateClear();

          this.htmlContent = response.data.detail;
          this.editorCount = this.htmlContent.length;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvEducationService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercveducation/personelusercveducationlisttab',
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

  getModel(): PersonelUserCvEducationDTO {
    return Object.assign({
      id: this.personelUserCvEducationDTO.id,
      userId: this.personelUserCvEducationDTO.userId,
      personelUserId: this.personelUserCvEducationDTO.personelUserId,
      cvId: this.personelUserCvEducationDTO.cvId,
      universityId: this.getUniversityId(
        this.personelUserCvEducationDTO.universityName
      ),
      facultyId: this.getUniversityFacultyId(
        this.personelUserCvEducationDTO.facultyName
      ),
      departmentId: this.getUniversityDepartmentId(
        this.personelUserCvEducationDTO.departmentName
      ),
      educationInfo: this.personelUserCvEducationDTO.educationInfo,
      startDate: new Date(this.personelUserCvEducationDTO.startDate).toJSON(),
      endDate: new Date(
        this.setNullDateValue(this.personelUserCvEducationDTO.endDate)
      ).toJSON(),
      detail: this.htmlContent,
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
    this.editorCount = this.htmlContent.length;
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
        this.validationService.handleSuccesses(response);
        this.universities = response.data.filter(
          (f) => f.universityName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getFaculties() {
    this.universityFacultyService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityFaculties = response.data.filter(
          (f) => f.facultyName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartments = response.data.filter(
          (f) => f.departmentName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUniversityId(universityName: string): string {
    const universityId = this.universities.filter(
      (c) => c.universityName === universityName
    )[0]?.id;

    return universityId;
  }

  getUniversityFacultyId(universityFacultyName: string): string {
    const facultyId = this.universityFaculties.filter(
      (c) => c.facultyName === universityFacultyName
    )[0]?.id;

    return facultyId;
  }

  getUniversityDepartmentId(universityDepartmentName: string): string {
    const departmentId = this.universityDepartments.filter(
      (c) => c.departmentName === universityDepartmentName
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
    this.htmlContent = '';
  }
}
