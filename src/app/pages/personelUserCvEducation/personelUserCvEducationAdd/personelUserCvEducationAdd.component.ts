import { PersonelUserCvService } from './../../../services/personelUserCv.service';
import { LocalStorageService } from './../../../services/localStorage.service';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
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
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { PersonelUserCvEducationDTO } from '../../../models/personelUserCvEducationDTO';
import { UniversityService } from '../../../services/university.service';
import { FacultyService } from '../../../services/faculty.service';
import { University } from '../../../models/university';
import { Faculty } from '../../../models/faculty';
import { PersonelUserCv } from '../../../models/personelUserCv';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../models/department';

@Component({
  selector: 'app-personelUserCvEducationAdd',
  templateUrl: './personelUserCvEducationAdd.component.html',
  styleUrls: ['./personelUserCvEducationAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvEducationAddComponent implements OnInit {
  addForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  universities: University[] = [];
  faculties: Faculty[] = [];
  departments: Department[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  detailText: string;
  componentTitle = 'Personel User Cv Education Add Form';
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
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
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();

    this.getUniversities();
    this.getUniversityDepartments();
    this.getFaculties();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      cvName: ['', [Validators.required, Validators.minLength(3)]],
      educationInfo: ['', [Validators.required, Validators.minLength(3)]],
      universityName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      facultyName: ['', [Validators.required, Validators.minLength(3)]],
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

  add() {
    if (
      this.getModel().userId > 0 &&
      this.getModel().cvId > 0 &&
      this.getModel().universityId > 0 &&
      this.getModel().departmentId > 0 &&
      this.getModel().facultyId > 0 &&
      this.getModel().detail.length >= 50
    ) {
      this.personelUserCvEducationService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercveducation/personelusercveducationlisttab',
          ]);
        },
        (error) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvEducationDTO {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      personelUserId: this.getPersonelUserId(this.addForm.value.userEmail),
      cvId: this.getPersonelUserCvId(this.addForm.value.cvName),
      universityId: this.getUniversityId(this.addForm.value.universityName),
      departmentId: this.getepartmentId(this.addForm.value.departmentName),
      facultyId: this.getFacultyId(this.addForm.value.facultyName),
      abandonment: this.addForm.value.abandonment,
      educationInfo: this.addForm.value.educationInfo,
      startDate: new Date(this.addForm.value.startDate).toJSON(),
      endDate: new Date(this.addForm.value.endDate).toJSON(),
      detail: this.addForm.value.detail,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
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

  getPersonelUserId(email: string): number {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data.filter(
          (f) => f.userId == this.getUserId(this.addForm.value.userEmail)
        );
      },
      (error) => console.error
    );
  }

  count() {
    this.detailText = this.addForm.value.detail.length;
  }

  getUniversities() {
    this.universityService.getAll().subscribe(
      (response) => {
        this.universities = response.data;
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

  getFaculties() {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response.data;
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
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

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('cvName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('universityName');
    value.reset();
    this.getUniversities();
  }

  clearInput4() {
    let value = this.addForm.get('facultyName');
    value.reset();
    this.getUniversityDepartments();
  }

  clearInput5() {
    let value = this.addForm.get('departmentName');
    value.reset();
    this.getFaculties();
  }

  clearInput6() {
    let value = this.addForm.get('startDate');
    value.reset();
  }

  clearInput7() {
    let value = this.addForm.get('endDate');
    value.reset();
  }

  clearInput8() {
    let value = this.addForm.get('detail');
    value.reset();
    this.detailText = '';
  }
}
