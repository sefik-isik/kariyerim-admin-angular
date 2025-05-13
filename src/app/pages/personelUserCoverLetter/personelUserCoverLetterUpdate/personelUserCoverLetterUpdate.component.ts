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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { Language } from '../../../models/language';
import { LanguageLevel } from '../../../models/languageLevel';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { PersonelUserCoverLetterDTO } from '../../../models/PersonelUserCoverLetterDTO';

@Component({
  selector: 'app-personelUserCoverLetterUpdate',
  templateUrl: './personelUserCoverLetterUpdate.component.html',
  styleUrls: ['./personelUserCoverLetterUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCoverLetterUpdateComponent implements OnInit {
  updateForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  descriptionText: string;

  componentTitle = 'Personel User Cover Letter Update Form';
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
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getAdminValues();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getUserValues(params['personelusercoverletterId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  getUserValues(id: number) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.personelUserCoverLetterService.getById(adminModel).subscribe(
      (response) => {
        this.updateForm.patchValue({
          title: response.data.title,
          description: response.data.description,
        });
        this.id = response.data.id;
        this.personelUserId = response.data.personelUserId;
        this.userEmail = this.getEmailByUserId(this.personelUserId);
      },
      (error) => console.error
    );
  }

  update() {
    if (this.updateForm.valid && this.getModel().id > 0) {
      this.personelUserCoverLetterService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusercoverletters']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCoverLetterDTO {
    return Object.assign({
      id: this.id,
      personelUserId: this.personelUserId,
      title: this.updateForm.value.title,
      description: this.updateForm.value.description,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.id).subscribe(
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

  getEmailByUserId(personelUserId: number): string {
    return this.personelUserDTOs.find((u) => u.id == personelUserId)?.email;
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  clearInput1() {
    let value = this.updateForm.get('title');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.updateForm.get('description');
    value.reset();
    this.getAdminValues();
  }
}
