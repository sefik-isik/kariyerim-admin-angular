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
import { LocalStorageService } from '../../../services/localStorage.service';
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
  selector: 'app-personelUserCvAdd',
  templateUrl: './personelUserCvAdd.component.html',
  styleUrls: ['./personelUserCvAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvAddComponent implements OnInit {
  addForm: FormGroup;
  personelUsers: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  addressDetailText: string;
  componentTitle = 'Personel User Cv Add Form';
  userId: number;
  users: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getUsers();
    this.getLanguages();
    this.getLanguageLevels();
    this.checkAdmin();
  }

  checkAdmin() {
    if (this.authService.isAdmin('status')) {
      this.isAdmin = true;
    }
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
    const userId = this.getUserId(this.addForm.value.userEmail);
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      personelUserId: this.getPersonelUserId(userId),
      cvName: this.addForm.value.cvName,
      languageId: this.getLanguageId(this.addForm.value.languageName),
      languageLevelId: this.getLanguageLevelId(
        this.addForm.value.languageLevel
      ),
      isPrivate: this.addForm.value.isPrivate,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data.filter((f) => f.code == PersonelUserCode);
      },
      (error) => console.error
    );
  }

  getPersonelUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    const userId = this.getUserId(this.addForm.value.userEmail);

    this.personelUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.personelUsers = response.data
          .filter((f) => f.id == userId)
          .filter((f) => f.code == PersonelUserCode);
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
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserId(userId: number): number {
    const personelUserId = this.personelUsers.filter(
      (c) => c.userId === userId
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
    this.getUsers();
  }

  clearInput2() {
    let value = this.addForm.get('personelUserName');
    value.reset();
    this.getPersonelUsers();
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
