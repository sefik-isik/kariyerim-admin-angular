import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { PersonelUserCoverLetter } from '../../../models/component/personelUserCoverLetter';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCoverLetterDTO } from '../../../models/dto/personelUserCoverLetterDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCoverLetterAdd',
  templateUrl: './personelUserCoverLetterAdd.component.html',
  styleUrls: ['./personelUserCoverLetterAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCoverLetterAddComponent implements OnInit {
  personelUserCoverLetterMOdel: PersonelUserCoverLetterDTO =
    {} as PersonelUserCoverLetterDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  descriptionCount: number;
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Cover Letter Add Form';

  constructor(
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCoverLetterService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercoverletter/personelusercoverletterlisttab',
          ]);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCoverLetter {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserCoverLetterMOdel.email),
      personelUserId: this.getPersonelUserId(
        this.getUserId(this.personelUserCoverLetterMOdel.email)
      ),
      title: this.personelUserCoverLetterMOdel.title,
      description: this.personelUserCoverLetterMOdel.description,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  count() {
    this.descriptionCount =
      this.personelUserCoverLetterMOdel.description.length;
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

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getPersonelUserId(userId: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.userId === userId
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserCoverLetterMOdel.email = '';
  }

  titleClear() {
    this.personelUserCoverLetterMOdel.title = '';
  }

  descriptionClear() {
    this.personelUserCoverLetterMOdel.description = '';
  }
}
