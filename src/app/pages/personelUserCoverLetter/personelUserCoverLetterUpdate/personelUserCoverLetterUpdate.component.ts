import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { Language } from '../../../models/component/language';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { PersonelUserCoverLetterDTO } from '../../../models/dto/personelUserCoverLetterDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCoverLetterUpdate',
  templateUrl: './personelUserCoverLetterUpdate.component.html',
  styleUrls: ['./personelUserCoverLetterUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCoverLetterUpdateComponent implements OnInit {
  @Input() personelUserCoverLetterDTO: PersonelUserCoverLetterDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  descriptionCount: number;
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Cover Letter Update Form';

  constructor(
    private personelUserService: PersonelUserService,
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
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

    setTimeout(() => {
      this.getUserValues(this.personelUserCoverLetterDTO.id);
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
    this.personelUserCoverLetterService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserCoverLetterDTO.id = response.data.id;
        this.personelUserCoverLetterDTO.personelUserId =
          response.data.personelUserId;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCoverLetterService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercoverletter/personelusercoverletterlisttab',
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

  getModel(): PersonelUserCoverLetterDTO {
    return Object.assign({
      id: this.personelUserCoverLetterDTO.id,
      userId: this.personelUserCoverLetterDTO.userId,
      personelUserId: this.personelUserCoverLetterDTO.personelUserId,
      title: this.personelUserCoverLetterDTO.title,
      description: this.personelUserCoverLetterDTO.description,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  getAdminValues() {
    this.adminService
      .getAdminValues(this.personelUserCoverLetterDTO.id)
      .subscribe(
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

  getEmailByUserId(personelUserId: string): string {
    return this.personelUserDTOs.find((u) => u.id == personelUserId)?.email;
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  titleClear() {
    this.personelUserCoverLetterDTO.title = '';
  }

  descriptionClear() {
    this.personelUserCoverLetterDTO.description = '';
  }
}
