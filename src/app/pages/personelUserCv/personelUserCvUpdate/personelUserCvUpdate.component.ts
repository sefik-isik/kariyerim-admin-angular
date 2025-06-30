import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LanguageLevelService } from './../../../services/languageLevel.service';
import { LanguageService } from './../../../services/language.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
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
  selector: 'app-personelUserCvUpdate',
  templateUrl: './personelUserCvUpdate.component.html',
  styleUrls: ['./personelUserCvUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvUpdateComponent implements OnInit {
  @Input() personelUserCvDTO: PersonelUserCvDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Cv Update Form';

  constructor(
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.getLanguages();
    this.getLanguageLevels();

    setTimeout(() => {
      this.getUserValues(this.personelUserCvDTO.id);
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
    this.personelUserCvService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserCvDTO.id = response.data.id;
        this.personelUserCvDTO.personelUserId = response.data.personelUserId;
        this.personelUserCvDTO.email = this.getEmailByUserId(
          this.personelUserCvDTO.personelUserId
        );
        this.personelUserCvDTO.cvName = response.data.cvName;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercv/personelusercvlisttab',
          ]);
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvDTO {
    return Object.assign({
      id: this.personelUserCvDTO.id,
      userId: this.personelUserCvDTO.userId,
      personelUserId: this.personelUserCvDTO.personelUserId,
      cvName: this.personelUserCvDTO.cvName,
      languageId: this.getLanguageId(this.personelUserCvDTO.languageName),
      languageLevelId: this.getLanguageLevelId(this.personelUserCvDTO.level),
      isPrivate: this.personelUserCvDTO.isPrivate,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.personelUserCvDTO.id).subscribe(
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

  getEmailByUserId(personelUserId: string): string {
    return this.personelUserDTOs.find((u) => u.id == personelUserId)?.email;
  }

  getLanguageNameById(languageId: string) {
    return this.languages.find((u) => u.id == languageId)?.languageName;
  }

  getLanguageLevelById(languageLevelId: string) {
    return this.languageLevels.find((u) => u.id == languageLevelId)?.levelTitle;
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
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

  cvNameClear() {
    this.personelUserCvDTO.cvName = '';
  }

  languageNameClear() {
    this.personelUserCvDTO.languageName = '';
  }

  levelClear() {
    this.personelUserCvDTO.level = 0;
  }
}
