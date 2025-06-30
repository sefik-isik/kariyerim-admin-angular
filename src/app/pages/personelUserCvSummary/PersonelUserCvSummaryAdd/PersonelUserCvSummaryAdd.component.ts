import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { PersonelUserCvSummary } from '../../../models/component/personelUserCvSummary';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvSummaryDTO } from '../../../models/dto/personelUserCvSummaryDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvSummaryAdd',
  templateUrl: './personelUserCvSummaryAdd.component.html',
  styleUrls: ['./personelUserCvSummaryAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvSummaryAddComponent implements OnInit {
  personelUserCvSummaryModel: PersonelUserCvSummaryDTO =
    {} as PersonelUserCvSummaryDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  detailCount: number;
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Cv Summary Add Form';

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    private personelUserCvService: PersonelUserCvService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvSummaryService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercvsummary/personelusercvsummarylisttab',
          ]);
        },
        (responseError) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvSummary {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserCvSummaryModel.email),
      personelUserId: this.getPersonelUserId(
        this.personelUserCvSummaryModel.email
      ),
      cvId: this.getPersonelUserCvId(this.personelUserCvSummaryModel.cvName),
      cvSummaryTitle: this.personelUserCvSummaryModel.cvSummaryTitle,
      cvSummaryDescription:
        this.personelUserCvSummaryModel.cvSummaryDescription,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
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

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data;
      },
      (responseError) => console.error
    );
  }

  count() {
    this.detailCount =
      this.personelUserCvSummaryModel.cvSummaryDescription.length;
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserCvId(cvName: string): string {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserCvSummaryModel.email = '';
  }

  cvNameClear() {
    this.personelUserCvSummaryModel.cvName = '';
  }

  cvSummaryTitleClear() {
    this.personelUserCvSummaryModel.cvSummaryTitle = '';
  }

  cvSummaryDescriptionClear() {
    this.personelUserCvSummaryModel.cvSummaryDescription = '';
  }
}
