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
import { Router, RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { Language } from '../../../models/language';
import { LanguageLevel } from '../../../models/languageLevel';

@Component({
  selector: 'app-personelUserCvAdd',
  templateUrl: './personelUserCvAdd.component.html',
  styleUrls: ['./personelUserCvAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvAddComponent implements OnInit {
  addForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;

  componentTitle = 'Personel User Cv Add Form';
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();

    this.getLanguages();
    this.getLanguageLevels();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      cvName: ['', [Validators.required, Validators.minLength(3)]],
      languageName: ['', [Validators.required, Validators.minLength(3)]],
      languageLevel: ['', [Validators.required, Validators.minLength(3)]],
      isPrivate: [false],
    });
  }

  add() {
    if (
      this.addForm.valid &&
      this.getModel().userId > 0 &&
      this.getModel().personelUserId > 0 &&
      this.getModel().languageId > 0 &&
      this.getModel().languageLevelId > 0
    ) {
      this.personelUserCvService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusercvs']);
        },
        (error) => console.log(error)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvDTO {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      personelUserId: this.getPersonelUserId(this.addForm.value.userEmail),
      cvName: this.addForm.value.cvName,
      languageId: this.getLanguageId(this.addForm.value.languageName),
      languageLevelId: this.getLanguageLevelId(
        this.addForm.value.languageLevel
      ),
      isPrivate: this.addForm.value.isPrivate,
      createDate: new Date(Date.now()).toJSON(),
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

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserId(email: string): number {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
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
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('personelUserName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('languageName');
    value.reset();
    this.getLanguages();
  }

  clearInput4() {
    let value = this.addForm.get('languageLevel');
    value.reset();
    this.getLanguageLevels();
  }

  clearInput5() {
    let value = this.addForm.get('cvName');
    value.reset();
  }
}
