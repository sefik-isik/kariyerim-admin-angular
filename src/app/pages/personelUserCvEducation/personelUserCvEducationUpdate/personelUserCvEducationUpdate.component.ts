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
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminModel } from '../../../models/adminModel';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { UniversityService } from '../../../services/university.service';
import { FacultyService } from '../../../services/faculty.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { University } from '../../../models/university';
import { Faculty } from '../../../models/faculty';
import { PersonelUserCv } from '../../../models/personelUserCv';
import { PersonelUserCvEducationDTO } from '../../../models/personelUserCvEducationDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AdminService } from '../../../services/admin.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-personelUserCvEducationUpdate',
  templateUrl: './personelUserCvEducationUpdate.component.html',
  styleUrls: ['./personelUserCvEducationUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvEducationUpdateComponent implements OnInit {
  updateForm: FormGroup;
  @Input() personelUserCvEducationDTO: PersonelUserCvEducationDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  users: UserDTO[] = [];
  universities: University[] = [];
  faculties: Faculty[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  departments: Department[] = [];
  id: number;
  personelUserId: number;
  personelUserName: string;
  userEmail: string;
  detailText: string;
  detailCount: number;
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Cv Education Update Form';

  constructor(
    private personelUserCvEducationService: PersonelUserCvEducationService,
    private universityService: UniversityService,
    private departmentService: DepartmentService,
    private facultyService: FacultyService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getAdminValues();
    this.getUniversities();
    this.getUniversityDepartments();
    this.getFaculties();

    setTimeout(() => {
      this.getUserValues(this.personelUserCvEducationDTO.id);
    }, 200);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      cvName: ['', [Validators.required, Validators.minLength(3)]],
      educationInfo: ['', [Validators.required, Validators.minLength(3)]],
      universityName: ['', [Validators.required, Validators.minLength(3)]],
      facultyName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      abandonment: [false],
      detail: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  getUserValues(id: number) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.personelUserCvEducationService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.personelUserId = response.data.personelUserId;
        this.userEmail = this.getUserEmailById(this.personelUserId);
        this.detailCount = this.count(response.data.detail);
        this.updateForm.patchValue({
          cvName: this.getCvNameById(response.data.cvId),
          educationInfo: response.data.educationInfo,
          universityName: this.getUniversityNameById(
            response.data.universityId
          ),
          facultyName: this.getFacultyNameById(response.data.facultyId),
          departmentName: this.getDepartmentNameById(
            response.data.departmentId
          ),
          startDate: this.formatDate(response.data.startDate),
          endDate: this.formatDate(response.data.endDate),
          abandonment: response.data.abandonment,
          detail: response.data.detail,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().personelUserId > 0 &&
      this.getModel().universityId > 0 &&
      this.getModel().facultyId > 0 &&
      this.getModel().departmentId > 0
    ) {
      this.personelUserCvEducationService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercveducation/personelusercveducationlisttab',
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

  getModel(): PersonelUserCvEducationDTO {
    return Object.assign({
      id: this.id,
      personelUserId: this.getPersonelUserId(this.userEmail),
      cvId: this.getPersonelUserCvId(this.updateForm.value.cvName),
      universityId: this.getUniversityId(this.updateForm.value.universityName),
      departmentId: this.getepartmentId(this.updateForm.value.departmentName),
      facultyId: this.getFacultyId(this.updateForm.value.facultyName),
      abandonment: this.updateForm.value.abandonment,
      educationInfo: this.updateForm.value.educationInfo,
      startDate: new Date(this.updateForm.value.startDate).toJSON(),
      endDate: new Date(this.updateForm.value.endDate).toJSON(),
      detail: this.updateForm.value.detail,
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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
      },
      (error) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (error) => console.error
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data;
      },
      (error) => console.error
    );
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

  getUniversityDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (error) => console.error
    );
  }

  getUserEmailById(personelUserId: number) {
    const userEmail = this.userDTOs.filter((c) => c.id === personelUserId)[0]
      ?.email;

    return userEmail;
  }

  getCvNameById(cvId: number) {
    const cvName = this.personelUserCvs.filter((c) => c.id === cvId)[0]?.cvName;

    return cvName;
  }

  getUniversityNameById(universityId: number) {
    const universityName = this.universities.filter(
      (c) => c.id === universityId
    )[0]?.universityName;

    return universityName;
  }

  getFacultyNameById(facultyId: number) {
    const facultyName = this.faculties.filter((c) => c.id === facultyId)[0]
      ?.facultyName;

    return facultyName;
  }

  getDepartmentNameById(departmentId: number) {
    const departmentName = this.departments.filter(
      (c) => c.id === departmentId
    )[0]?.departmentName;

    return departmentName;
  }

  getUniversityId(universityName: string): number {
    const universityId = this.universities.filter(
      (c) => c.universityName === universityName
    )[0]?.id;

    return universityId;
  }

  getFacultyId(facultyName: string): number {
    const facultyId = this.faculties.filter(
      (c) => c.facultyName === facultyName
    )[0]?.id;

    return facultyId;
  }

  getepartmentId(departmentName: string): number {
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  getPersonelUserCvId(cvName: string): number {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  getPersonelUserId(email: string): number {
    const personelUserId = this.userDTOs.filter((c) => c.email === email)[0]
      ?.id;

    return personelUserId;
  }

  clearInput1() {
    let value = this.updateForm.get('userEmail');
    value.reset();
  }

  clearInput2() {
    let value = this.updateForm.get('cvName');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('universityName');
    value.reset();
    this.getUniversities();
  }

  clearInput4() {
    let value = this.updateForm.get('facultyName');
    value.reset();
    this.getUniversityDepartments();
  }

  clearInput5() {
    let value = this.updateForm.get('departmentName');
    value.reset();
    this.getFaculties();
  }

  clearInput6() {
    let value = this.updateForm.get('startDate');
    value.reset();
  }

  clearInput7() {
    let value = this.updateForm.get('endDate');
    value.reset();
  }

  clearInput8() {
    let value = this.updateForm.get('detail');
    value.reset();
    this.detailText = '';
  }
}
