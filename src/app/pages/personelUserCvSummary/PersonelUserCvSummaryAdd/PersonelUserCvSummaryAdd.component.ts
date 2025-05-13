import { PersonelUserCvSummaryService } from './../../../services/personelUserCvSummary.service';
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
import { Router, RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCv } from '../../../models/personelUserCv';
import { PersonelUserCvSummary } from '../../../models/personelUserCvSummary';

@Component({
  selector: 'app-PersonelUserCvSummaryAdd',
  templateUrl: './PersonelUserCvSummaryAdd.component.html',
  styleUrls: ['./PersonelUserCvSummaryAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvSummaryAddComponent implements OnInit {
  addForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  detailText: string;

  componentTitle = 'Personel User Cv Summary Add Form';
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    private personelUserCvService: PersonelUserCvService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
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
      cvSummaryTitle: ['', [Validators.required, Validators.minLength(3)]],
      cvSummaryDescription: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  add() {
    if (this.getModel().userId > 0 && this.getModel().cvId > 0) {
      this.personelUserCvSummaryService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusercvsummaryies']);
        },
        (error) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvSummary {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      personelUserId: this.getPersonelUserId(this.addForm.value.userEmail),
      cvId: this.getPersonelUserCvId(this.addForm.value.cvName),
      cvSummaryTitle: this.addForm.value.cvSummaryTitle,
      cvSummaryDescription: this.addForm.value.cvSummaryDescription,
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
    this.detailText = this.addForm.value.cvSummaryDescription.length;
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
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
    let value = this.addForm.get('cvSummaryTitle');
    value.reset();
    this.getAdminValues();
  }

  clearInput4() {
    let value = this.addForm.get('cvSummaryDescription');
    value.reset();
    this.detailText = '';
    this.getAdminValues();
  }
}
