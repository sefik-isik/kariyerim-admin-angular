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
import { AuthService } from '../../../services/auth.service';

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
  admin: boolean = false;
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
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvSummaryService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercvsummary/personelusercvsummarylisttab',
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

  getModel(): PersonelUserCvSummary {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserCvSummaryModel.email.trim()),
      personelUserId: this.getPersonelUserId(
        this.personelUserCvSummaryModel.email.trim()
      ),
      cvId: this.getPersonelUserCvId(
        this.personelUserCvSummaryModel.cvName.trim()
      ),
      cvSummaryTitle: this.personelUserCvSummaryModel.cvSummaryTitle.trim(),
      cvSummaryDescription:
        this.personelUserCvSummaryModel.cvSummaryDescription.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
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
          this.personelUserCvSummaryModel.email = adminModel.email;
          this.personelUserCvSummaryModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvs = response.data.filter(
          (f) => f.email == this.personelUserCvSummaryModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setPersonelUserCv(email: string) {
    this.personelUserCvSummaryModel.email = email;

    this.getAdminValues();
  }

  count() {
    this.detailCount =
      this.personelUserCvSummaryModel.cvSummaryDescription.length;
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserCvSummaryModel.userId;
    }

    return userId;
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
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
