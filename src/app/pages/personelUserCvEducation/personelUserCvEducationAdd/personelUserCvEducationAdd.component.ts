import { PersonelUserCvService } from './../../../services/personelUserCv.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { UniversityService } from '../../../services/university.service';
import { FacultyService } from '../../../services/faculty.service';
import { University } from '../../../models/component/university';
import { Faculty } from '../../../models/component/faculty';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/component/department';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';
import { PersonelUser } from '../../../models/component/personelUser';

@Component({
  selector: 'app-personelUserCvEducationAdd',
  templateUrl: './personelUserCvEducationAdd.component.html',
  styleUrls: ['./personelUserCvEducationAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvEducationAddComponent implements OnInit {
  personelUserCvEducationModel: PersonelUserCvEducationDTO =
    {} as PersonelUserCvEducationDTO;
  userDTOs: UserDTO[] = [];
  personelUsers: PersonelUser[] = [];
  universities: University[] = [];
  faculties: Faculty[] = [];
  departments: Department[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  detailCount: number;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Cv Education Add Form';

  constructor(
    private universityService: UniversityService,
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
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
    this.getFaculties();
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
      departmentId: this.getDepartmentId(
        this.personelUserCvEducationModel.departmentName
      ),
      facultyId: this.getFacultyId(
        this.personelUserCvEducationModel.facultyName
      ),
      startDate: new Date(this.personelUserCvEducationModel.startDate).toJSON(),
      endDate: new Date(
        this.setNullDateValue(this.personelUserCvEducationModel.endDate)
      ).toJSON(),
      educationInfo: this.setNullValue(
        this.personelUserCvEducationModel.educationInfo
      ),
      detail: this.setNullValue(this.personelUserCvEducationModel.detail),
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
    this.detailCount = this.personelUserCvEducationModel.detail.length;
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

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.faculties = response.data.filter((f) => f.facultyName != '-');
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

  getFacultyId(facultyName: string): string {
    const facultyId = this.faculties.filter(
      (c) => c.facultyName === facultyName
    )[0]?.id;

    return facultyId;
  }

  getDepartmentId(departmentName: string): string {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
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
