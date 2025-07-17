import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserFollowCompanyUser } from '../../../models/component/personelUserFollowCompanyUser';
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

@Component({
  selector: 'app-companyUserAdvertFollowAdd',
  templateUrl: './companyUserAdvertFollowAdd.component.html',
  styleUrls: ['./companyUserAdvertFollowAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertFollowAddComponent implements OnInit {
  companyUserAdvertDTO: CompanyUserAdvertDTO = {} as CompanyUserAdvertDTO;
  personelUserAdvertFollowModel: PersonelUserAdvertFollowDTO =
    {} as PersonelUserAdvertFollowDTO;
  companyUserDTOs: CompanyUserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
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
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService
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
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuseradvert/companyuseradvertlisttab',
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

  getModel(): PersonelUserAdvertFollowDTO {
    return Object.assign({
      id: '',
      advertId: this.companyUserAdvertDTO.id,
      companyUserId: this.getCompanyUserId(this.companyUserAdvertDTO.email),
      personelUserId: this.getPersonelUserId(
        this.personelUserAdvertFollowModel.personelUserMail
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getCompanyUsers(response);
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUserId(email: string): string {
    const companyUserId = this.companyUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return companyUserId;
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
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
    this.personelUserAdvertFollowModel.personelUserMail = '';
  }
}
