import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { Language } from '../../../models/component/language';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { PersonelUser } from '../../../models/component/personelUser';
import { PersonelUserCvDTO } from '../../../models/dto/personelUserCvDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { LanguageService } from './../../../services/language.service';
import { LanguageLevelService } from './../../../services/languageLevel.service';

@Component({
  selector: 'app-personelUserCvAdd',
  templateUrl: './personelUserCvAdd.component.html',
  styleUrls: ['./personelUserCvAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvAddComponent implements OnInit {
  personelUserCvModel: PersonelUserCvDTO = {} as PersonelUserCvDTO;
  personelUsers: PersonelUser[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Personel User Cv Add Form';

  constructor(
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getLanguages();
    this.getLanguageLevels();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercv/personelusercvlisttab',
          ]);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvDTO {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserCvModel.email),
      personelUserId: this.getPersonelUserId(this.personelUserCvModel.email),
      cvName: this.personelUserCvModel.cvName,
      languageId: this.getLanguageId(this.personelUserCvModel.languageName),
      languageLevelId: this.getLanguageLevelId(
        this.personelUserCvModel.levelTitle
      ),
      isPrivate: this.personelUserCvModel.isPrivate,
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
          this.personelUserCvModel.email = adminModel.email;
          this.personelUserCvModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);

        this.personelUsers = response.data.filter(
          (f) => f.email == this.personelUserCvModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setPersonelUserMail(email: string) {
    this.personelUserCvModel.email = email;

    this.getAdminValues();
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.personelUserCvModel.languageId = response.data.filter(
          (f) => f.languageName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.languages = response.data.filter((f) => f.languageName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.personelUserCvModel.languageLevelId = response.data.filter(
          (f) => f.levelTitle == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.languageLevels = response.data.filter((f) => f.levelTitle != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserCvModel.userId;
    }

    return userId;
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUsers.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getLanguageId(languageName: string): string {
    let languageId: string;

    languageName == null || languageName == '' || languageName == '-'
      ? (languageId = this.personelUserCvModel.languageId)
      : (languageId = this.languages.filter(
          (c) => c.languageName === languageName
        )[0]?.id);

    return languageId;
  }

  getLanguageLevelId(levelTitle: string): string {
    let languageLevelId: string;

    levelTitle == null || levelTitle == '' || levelTitle == '-'
      ? (languageLevelId = this.personelUserCvModel.languageLevelId)
      : (languageLevelId = this.languageLevels.filter(
          (c) => c.levelTitle === levelTitle
        )[0]?.id);

    return languageLevelId;
  }

  emailClear() {
    this.personelUserCvModel.email = '';
  }

  cvNameClear() {
    this.personelUserCvModel.cvName = '';
  }

  languageNameClear() {
    this.personelUserCvModel.languageName = '';
  }

  levelTitleClear() {
    this.personelUserCvModel.level = 0;
  }
}
