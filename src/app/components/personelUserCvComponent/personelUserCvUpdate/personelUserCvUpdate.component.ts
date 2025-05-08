import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { LanguageLevelService } from './../../../services/languageLevel.service';
import { LanguageService } from './../../../services/language.service';
import { AuthService } from './../../../services/auth.service';
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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { Language } from '../../../models/language';
import { LanguageLevel } from '../../../models/languageLevel';
import { PersonelUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-personelUserCvUpdate',
  templateUrl: './personelUserCvUpdate.component.html',
  styleUrls: ['./personelUserCvUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvUpdateComponent implements OnInit {
  updateForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;

  componentTitle = 'Personel User Cv Update Form';
  id: number;
  userEmail: string;
  personelUserName: string;
  personelUserId: number;
  cvName: string;
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getAdminValues();
    this.getLanguages();
    this.getLanguageLevels();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['personelusercvId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      cvName: ['', [Validators.required, Validators.minLength(3)]],
      languageName: ['', [Validators.required, Validators.minLength(3)]],
      languageLevel: ['', [Validators.required, Validators.minLength(3)]],
      isPrivate: ['', [Validators.required]],
    });
  }

  getById(id: number) {
    this.personelUserCvService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          cvName: response.data.cvName,
          languageName: this.getLanguageNameById(response.data.languageId),
          languageLevel: this.getLanguageLevelById(
            response.data.languageLevelId
          ),
          isPrivate: response.data.isPrivate,
        });
        this.id = response.data.id;
        this.personelUserId = response.data.personelUserId;
        this.userEmail = this.getEmailByUserId(this.personelUserId);
        this.cvName = response.data.cvName;
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().userId > 0 &&
      this.getModel().languageId > 0 &&
      this.getModel().languageLevelId > 0
    ) {
      this.personelUserCvService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusercvs']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvDTO {
    return Object.assign({
      id: this.id,
      userId: this.userId,
      personelUserId: this.personelUserId,
      cvName: this.updateForm.value.cvName,
      languageId: this.getLanguageId(this.updateForm.value.languageName),
      languageLevelId: this.getLanguageLevelId(
        this.updateForm.value.languageLevel
      ),
      isPrivate: this.updateForm.value.isPrivate,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
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
      },
      (error) => console.error
    );
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.languages = response.data;
      },
      (error) => console.error
    );
  }

  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.languageLevels = response.data;
      },
      (error) => console.error
    );
  }

  getEmailByUserId(personelUserId: number): string {
    return this.personelUserDTOs.find((u) => u.id == personelUserId)?.email;
  }

  getLanguageNameById(languageId: number) {
    return this.languages.find((u) => u.id == languageId)?.languageName;
  }

  getLanguageLevelById(languageLevelId: number) {
    return this.languageLevels.find((u) => u.id == languageLevelId)?.levelTitle;
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getLanguageId(languageName: string): number {
    const languageId = this.languages.filter(
      (c) => c.languageName === languageName
    )[0]?.id;

    return languageId;
  }

  getLanguageLevelId(languageLevel: string): number {
    const cityId = this.languageLevels.filter(
      (c) => c.levelTitle === languageLevel
    )[0]?.id;

    return cityId;
  }

  clearInput1() {
    let value = this.updateForm.get('cvName');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.updateForm.get('languageName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.updateForm.get('languageLevel');
    value.reset();
    this.getLanguages();
  }
}
