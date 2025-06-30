import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { UniversityService } from '../../../services/university.service';
import { FacultyService } from '../../../services/faculty.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { University } from '../../../models/component/university';
import { Faculty } from '../../../models/component/faculty';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/component/department';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvEducationUpdate',
  templateUrl: './personelUserCvEducationUpdate.component.html',
  styleUrls: ['./personelUserCvEducationUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvEducationUpdateComponent implements OnInit {
  @Input() personelUserCvEducationDTO: PersonelUserCvEducationDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  universities: University[] = [];
  faculties: Faculty[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  departments: Department[] = [];
  detailCount: number;
  today: number = Date.now();
  componentTitle = 'Personel User Cv Education Update Form';

  constructor(
    private personelUserCvEducationService: PersonelUserCvEducationService,
    private universityService: UniversityService,
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
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
        this.personelUserCvEducationDTO.id = response.data.id;
      },
      (responseError) => console.error
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
      personelUserId: this.getPersonelUserId(
        this.personelUserCvEducationDTO.email
      ),
      cvId: this.getPersonelUserCvId(this.personelUserCvEducationDTO.cvName),
      universityId: this.getUniversityId(
        this.personelUserCvEducationDTO.universityName
      ),
      facultyId: this.getFacultyId(this.personelUserCvEducationDTO.facultyName),
      departmentId: this.getepartmentId(
        this.personelUserCvEducationDTO.departmentName
      ),
      educationInfo: this.personelUserCvEducationDTO.educationInfo,
      startDate: new Date(this.personelUserCvEducationDTO.startDate).toJSON(),
      endDate: new Date(this.personelUserCvEducationDTO.endDate).toJSON(),
      detail: this.personelUserCvEducationDTO.detail,
      abandonment: this.personelUserCvEducationDTO.abandonment,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
      },
      (responseError) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (responseError) => console.error
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data;
      },
      (responseError) => console.error
    );
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data;
      },
      (responseError) => console.error
    );
  }

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data;
      },
      (responseError) => console.error
    );
  }

  getUniversityDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserEmailById(personelUserId: string) {
    const userEmail = this.userDTOs.filter((c) => c.id === personelUserId)[0]
      ?.email;

    return userEmail;
  }

  getUserId(email: string): string {
    const userId = this.userDTOs.filter((c) => c.email === email)[0]?.id;

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

  getepartmentId(departmentName: string): string {
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

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  cvNameClear() {
    this.personelUserCvEducationDTO.cvName = '';
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
