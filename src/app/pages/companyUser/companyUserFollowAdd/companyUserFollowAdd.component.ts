import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserFollowCompanyUserService } from '../../../services/personelUserFollowCompanyUser.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PersonelUserFollowCompanyUser } from '../../../models/component/personelUserFollowCompanyUser';
import { PersonelUserFollowCompanyUserDTO } from '../../../models/dto/personelUserFollowCompanyUserDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';

@Component({
  selector: 'app-companyUserFollowAdd',
  templateUrl: './companyUserFollowAdd.component.html',
  styleUrls: ['./companyUserFollowAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserFollowAddComponent implements OnInit {
  personelUserFollowCompanyUserModel: PersonelUserFollowCompanyUserDTO =
    {} as PersonelUserFollowCompanyUserDTO;
  companyUserDTO: CompanyUserDTO = {} as CompanyUserDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  componentTitle = 'Personel User Follow Company User Add Form';

  constructor(
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private personelUserFollowCompanyUserService: PersonelUserFollowCompanyUserService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserFollowCompanyUserService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/companyuser/companyuserlisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserFollowCompanyUser {
    return Object.assign({
      id: '',
      companyUserId: this.companyUserDTO.id,
      personelUserId: this.getPersonelUserId(
        this.personelUserFollowCompanyUserModel.personelUserMail
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
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
        this.userDTOs = response.data;
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

  getPersonelUserId(email: string): string {
    const personelUser = this.personelUserDTOs.find(
      (user) => user.email === email
    );
    if (personelUser) {
      return personelUser.id;
    } else {
      this.toastrService.error('Personel Kullanıcı bulunamadı', 'Hata');
      return '';
    }
  }

  personelUserMailClear() {
    this.personelUserFollowCompanyUserModel.personelUserMail = '';
  }
}
