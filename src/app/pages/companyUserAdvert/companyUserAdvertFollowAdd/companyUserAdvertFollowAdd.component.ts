import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserAdvertFollowService } from '../../../services/personelUserAdvertFollow.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserAdvertFollowDTO } from './../../../models/dto/personelUserAdvertFollowDTO';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { PersonelUserCvDTO } from '../../../models/dto/personelUserCvDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';

@Component({
  selector: 'app-companyUserAdvertFollowAdd',
  templateUrl: './companyUserAdvertFollowAdd.component.html',
  styleUrls: ['./companyUserAdvertFollowAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertFollowAddComponent implements OnInit {
  @Input() companyUserAdvertDTO: CompanyUserAdvertDTO;
  personelUserAdvertFollowModel: PersonelUserAdvertFollowDTO =
    {} as PersonelUserAdvertFollowDTO;
  companyUserDTOs: CompanyUserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvDTOs: PersonelUserCvDTO[] = [];
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Advert Follow Add Form';

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService,
    private personelUserCvService: PersonelUserCvService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserAdvertFollowService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuseradvert/companyuseradvertlisttab',
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

  getModel(): PersonelUserAdvertFollowDTO {
    return Object.assign({
      id: '',
      advertId: this.companyUserAdvertDTO.id,
      companyUserId: this.companyUserAdvertDTO.companyUserId,
      personelUserId: this.getPersonelUserId(
        this.personelUserAdvertFollowModel.personelUserMail
      ),
      personelUserCvId: this.getPersonelUserCvId(
        this.personelUserAdvertFollowModel.personelUserCvName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getCompanyUsers(response);
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
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

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserId(email: string): string {
    const companyUserId = this.companyUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return companyUserId;
  }

  getPersonelUserCvId(cvName: string): string {
    const cvId = this.personelUserCvDTOs.filter((c) => c.cvName === cvName)[0]
      ?.id;

    return cvId;
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

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  personelUserMailClear() {
    this.personelUserAdvertFollowModel.personelUserMail = '';
  }

  cvNameClear() {
    this.personelUserAdvertFollowModel.personelUserCvName = '';
  }
}
