import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCoverLetterDTO } from '../../../models/dto/personelUserCoverLetterDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';

@Component({
  selector: 'app-personelUserCoverLetterUpdate',
  templateUrl: './personelUserCoverLetterUpdate.component.html',
  styleUrls: ['./personelUserCoverLetterUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PersonelUserCoverLetterUpdateComponent implements OnInit {
  @Input() personelUserCoverLetterDTO: PersonelUserCoverLetterDTO;
  editorCount: number = 0;
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Personel User Cover Letter Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();

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
        this.validationService.handleSuccesses(response);
        this.htmlContent = response.data.description;
        this.editorCount = this.htmlContent.length;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCoverLetterService.update(this.getModel()).subscribe(
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

  getModel(): PersonelUserCoverLetterDTO {
    return Object.assign({
      id: this.personelUserCoverLetterDTO.id,
      userId: this.personelUserCoverLetterDTO.userId,
      personelUserId: this.personelUserCoverLetterDTO.personelUserId,
      title: this.personelUserCoverLetterDTO.title.trim(),
      description: this.htmlContent,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  titleClear() {
    this.personelUserCoverLetterDTO.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
