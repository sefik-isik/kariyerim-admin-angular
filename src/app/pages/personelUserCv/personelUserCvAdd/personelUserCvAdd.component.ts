import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LanguageLevelService } from './../../../services/languageLevel.service';
import { LanguageService } from './../../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCvDTO } from '../../../models/dto/personelUserCvDTO';
import { Language } from '../../../models/component/language';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvAdd',
  templateUrl: './personelUserCvAdd.component.html',
  styleUrls: ['./personelUserCvAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvAddComponent implements OnInit {
  personelUserCvModel: PersonelUserCvDTO = {} as PersonelUserCvDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;
  userDTOs: UserDTO[] = [];
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
    private validationService: ValidationService
  ) {}

  ngOnInit() {
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
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercv/personelusercvlisttab',
          ]);
        },
        (responseError) => console.error
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
      languageLevelId: this.getLanguageLevelId(this.personelUserCvModel.level),
      isPrivate: this.personelUserCvModel.isPrivate,
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
      },
      (responseError) => console.error
    );
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.languages = response.data;
      },
      (responseError) => console.error
    );
  }

  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.languageLevels = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getLanguageId(languageName: string): string {
    const languageId = this.languages.filter(
      (c) => c.languageName === languageName
    )[0]?.id;

    return languageId;
  }

  getLanguageLevelId(level: number): string {
    const cityId = this.languageLevels.filter((c) => c.level === level)[0]?.id;

    return cityId;
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

  levelClear() {
    this.personelUserCvModel.level = 0;
  }
}
