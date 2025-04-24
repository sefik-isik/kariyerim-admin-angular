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
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { Language } from '../../../models/language';
import { LanguageLevel } from '../../../models/languageLevel';

@Component({
  selector: 'app-personelUserCvUpdate',
  templateUrl: './personelUserCvUpdate.component.html',
  styleUrls: ['./personelUserCvUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvUpdateComponent implements OnInit {
  updateForm: FormGroup;
  personelUsers: PersonelUserDTO[] = [];
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
  users: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getUsers();
    this.getPersonelUsers();
    this.getLanguages();
    this.getLanguageLevels();
    this.checkAdmin();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['personelusercvId']);
      });
    }, 500);
  }

  checkAdmin() {
    if (this.authService.isAdmin('status')) {
      this.isAdmin = true;
    }
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
        this.userId = response.data.userId;
        this.userEmail = this.getEmailByUserId(response.data.userId);
        this.personelUserName = this.getPersonelNameByPersonelUserId(
          response.data.personelUserId
        );
        this.personelUserId = response.data.personelUserId;
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

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getPersonelUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.personelUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.personelUsers = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.languages = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.languageLevels = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (error) => console.error
    );
  }

  getEmailByUserId(userId: number): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getPersonelNameByPersonelUserId(userId: number): string {
    let personelUserName =
      this.personelUsers.find((u) => u.id == userId)?.firstName +
      ' ' +
      this.personelUsers.find((u) => u.id == userId)?.lastName;
    return personelUserName;
  }

  getLanguageNameById(languageId: number) {
    return this.languages.find((u) => u.id == languageId)?.languageName;
  }

  getLanguageLevelById(languageLevelId: number) {
    return this.languageLevels.find((u) => u.id == languageLevelId)?.levelTitle;
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )[0]?.id;

    return userId;
  }

  getPersonelUserId(personelUserName: string): number {
    const companyUserId = this.personelUsers.filter(
      (c) => c.firstName.toLowerCase() === personelUserName.toLowerCase()
    )[0]?.id;

    return companyUserId;
  }

  getLanguageId(languageName: string): number {
    const languageId = this.languages.filter(
      (c) => c.languageName.toLowerCase() === languageName.toLowerCase()
    )[0]?.id;

    return languageId;
  }

  getLanguageLevelId(languageLevel: string): number {
    const cityId = this.languageLevels.filter(
      (c) => c.levelTitle.toLowerCase() === languageLevel.toLowerCase()
    )[0]?.id;

    return cityId;
  }

  clearInput1() {
    let value = this.updateForm.get('userEmail');
    value.reset();
    this.getUsers();
  }

  clearInput2() {
    let value = this.updateForm.get('personelUserName');
    value.reset();
    this.getPersonelUsers();
  }

  clearInput3() {
    let value = this.updateForm.get('languageName');
    value.reset();
    this.getLanguages();
  }
}
