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
import { AuthService } from '../../../services/auth.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-personelUserCoverLetterAdd',
  templateUrl: './personelUserCoverLetterAdd.component.html',
  styleUrls: ['./personelUserCoverLetterAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PersonelUserCoverLetterAddComponent implements OnInit {
  personelUserCoverLetterModel: PersonelUserCoverLetterDTO =
    {} as PersonelUserCoverLetterDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  editorCount: number = 0;
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Personel User Cover Letter Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCoverLetterService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercoverletter/personelusercoverletterlisttab',
          ]);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCoverLetter {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserCoverLetterModel.email.trim()),
      personelUserId: this.getPersonelUserId(
        this.getUserId(this.personelUserCoverLetterModel.email.trim())
      ),
      title: this.personelUserCoverLetterModel.title.trim(),
      description: this.htmlContent,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  count() {
    this.editorCount = this.htmlContent.length;
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
          this.personelUserCoverLetterModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.personelUserCoverLetterModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserCoverLetterModel.userId;
    }

    return userId;
  }

  getPersonelUserId(userId: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.userId === userId
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserCoverLetterModel.email = '';
  }

  titleClear() {
    this.personelUserCoverLetterModel.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
