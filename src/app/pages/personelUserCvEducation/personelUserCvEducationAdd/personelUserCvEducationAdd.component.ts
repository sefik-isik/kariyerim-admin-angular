import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUser } from '../../../models/component/personelUser';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { University } from '../../../models/component/university';
import { UniversityFaculty } from '../../../models/component/universityFaculty';
import { UniversityDepartment } from '../../../models/component/universitydepartment';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { UniversityService } from '../../../services/university.service';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityFacultyService } from '../../../services/universityFaculty.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserCvService } from './../../../services/personelUserCv.service';

@Component({
  selector: 'app-personelUserCvEducationAdd',
  templateUrl: './personelUserCvEducationAdd.component.html',
  styleUrls: ['./personelUserCvEducationAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PersonelUserCvEducationAddComponent implements OnInit {
  personelUserCvEducationModel: PersonelUserCvEducationDTO =
    {} as PersonelUserCvEducationDTO;
  userDTOs: UserDTO[] = [];
  personelUsers: PersonelUser[] = [];
  universities: University[] = [];
  universityFaculties: UniversityFaculty[] = [];
  universityDepartments: UniversityDepartment[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  editorCount: number = 0;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Cv Education Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private universityService: UniversityService,
    private universityDepartmentService: UniversityDepartmentService,
    private universityFacultyService: UniversityFacultyService,
    private personelUserCvEducationService: PersonelUserCvEducationService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    private personelUserCvService: PersonelUserCvService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getUniversities();
    this.getUniversityDepartments();
    this.getUniversityFaculties();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvEducationService.add(this.getModel()).subscribe(
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
      id: '',
      userId: this.getUserId(this.personelUserCvEducationModel.email),
      personelUserId: this.getPersonelUserId(
        this.personelUserCvEducationModel.email
      ),
      cvId: this.getPersonelUserCvId(this.personelUserCvEducationModel.cvName),
      universityId: this.getUniversityId(
        this.personelUserCvEducationModel.universityName
      ),
      departmentId: this.getUniversityDepartmentId(
        this.personelUserCvEducationModel.departmentName
      ),
      facultyId: this.getUniversityFacultyId(
        this.personelUserCvEducationModel.facultyName
      ),
      startDate: new Date(this.personelUserCvEducationModel.startDate).toJSON(),
      endDate: new Date(
        this.setNullDateValue(this.personelUserCvEducationModel.endDate)
      ).toJSON(),
      educationInfo: this.setNullValue(
        this.personelUserCvEducationModel.educationInfo
      ),
      detail: this.setNullValue(this.htmlContent),
      abandonment: this.personelUserCvEducationModel.abandonment,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  setNullValue(value: string) {
    if (value == null || value == '') {
      value = '-';
    }
    return value;
  }

  setNullDateValue(value: string) {
    if (value == null || value == '') {
      value = '01.01.1900';
    }
    return value;
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.personelUserCvEducationModel.email = adminModel.email;
          this.personelUserCvEducationModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUsers = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvs = response.data.filter(
          (f) => f.email == this.personelUserCvEducationModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setPersonelUserCv(email: string) {
    this.personelUserCvEducationModel.email = email;

    this.getAdminValues();
  }

  getPersonelUserId(email: string): string {
    console.log(email);
    const personelUserId = this.personelUsers.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  count() {
    this.editorCount = this.htmlContent.length;
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

  getUniversityFaculties() {
    this.universityFacultyService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityFaculties = response.data.filter(
          (f) => f.facultyName != '-'
        );
        console.log(this.universityFaculties);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(email: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === email)[0]?.id;
    } else {
      userId = this.personelUserCvEducationModel.userId;
    }

    return userId;
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

  getPersonelUserCvId(cvName: string): string {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserCvEducationModel.email = '';
  }

  cvNameClear() {
    this.personelUserCvEducationModel.cvName = '';
  }

  universityNameClear() {
    this.personelUserCvEducationModel.universityName = '';
  }

  facultyNameClear() {
    this.personelUserCvEducationModel.facultyName = '';
  }

  departmentNameClear() {
    this.personelUserCvEducationModel.departmentName = '';
  }

  startDateClear() {
    this.personelUserCvEducationModel.startDate = '';
  }

  endDateClear() {
    this.personelUserCvEducationModel.endDate = '';
  }

  detailClear() {
    this.personelUserCvEducationModel.detail = '';
  }

  educationInfoClear() {
    this.personelUserCvEducationModel.educationInfo = '';
  }
}
