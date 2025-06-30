import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { UserService } from '../../../services/user.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { PersonelUserCvSummaryDTO } from '../../../models/dto/personelUserCvSummaryDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvSummaryUpdate',
  templateUrl: './personelUserCvSummaryUpdate.component.html',
  styleUrls: ['./personelUserCvSummaryUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvSummaryUpdateComponent implements OnInit {
  @Input() personelUserCvSummaryDTO: PersonelUserCvSummaryDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  users: UserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  userDTOs: UserDTO[] = [];
  detailCount: number;
  componentTitle = 'Personel User Cv Summary Update Form';

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();

    setTimeout(() => {
      this.getUserValues(this.personelUserCvSummaryDTO.id);
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
    this.personelUserCvSummaryService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserCvSummaryDTO.id = response.data.id;
        this.personelUserCvSummaryDTO.personelUserId =
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
      this.personelUserCvSummaryService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercvsummary/personelusercvsummarylisttab',
          ]);
        },
        (responseError) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvSummaryDTO {
    return Object.assign({
      id: this.personelUserCvSummaryDTO.id,
      userId: this.personelUserCvSummaryDTO.userId,
      personelUserId: this.getPersonelUserId(
        this.personelUserCvSummaryDTO.email
      ),
      cvId: this.getPersonelUserCvId(this.personelUserCvSummaryDTO.cvName),
      cvSummaryTitle: this.personelUserCvSummaryDTO.cvSummaryTitle,
      cvSummaryDescription: this.personelUserCvSummaryDTO.cvSummaryDescription,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
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
        this.getPersonelUserCvs(adminModel);
      },
      (responseError) => console.error
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data;
      },
      (responseError) => console.error
    );
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getPersonelUserCvId(cvName: string): string {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  cvNameClear() {
    this.personelUserCvSummaryDTO.cvName = '';
  }

  cvSummaryTitleClear() {
    this.personelUserCvSummaryDTO.cvSummaryTitle = '';
  }

  cvSummaryDescriptionClear() {
    this.personelUserCvSummaryDTO.cvSummaryDescription = '';
  }
}
