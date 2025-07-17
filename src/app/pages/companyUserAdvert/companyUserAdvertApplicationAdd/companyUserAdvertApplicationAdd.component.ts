import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserAdvertApplication } from '../../../models/component/personelUserAdvertApplication';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { PersonelUserAdvertApplicationDTO } from '../../../models/dto/personelUserAdvertApplicationDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserAdvertApplicationService } from '../../../services/personelUserAdvertApplication.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { CompanyUserService } from '../../../services/companyUser.service';

@Component({
  selector: 'app-companyUserAdvertApplicationAdd',
  templateUrl: './companyUserAdvertApplicationAdd.component.html',
  styleUrls: ['./companyUserAdvertApplicationAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertApplicationAddComponent implements OnInit {
  companyUserAdvertDTO: CompanyUserAdvertDTO = {} as CompanyUserAdvertDTO;
  personelUserAdvertApplicationModel: PersonelUserAdvertApplicationDTO =
    {} as PersonelUserAdvertApplicationDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  componentTitle = 'Personel User Advert Application Add Form';

  constructor(
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private localStorageService: LocalStorageService,
    private companyUserService: CompanyUserService,
    private adminService: AdminService,
    private personelUserAdvertApplicationService: PersonelUserAdvertApplicationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserAdvertApplicationService.add(this.getModel()).subscribe(
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

  getModel(): PersonelUserAdvertApplication {
    return Object.assign({
      id: '',
      advertId: this.companyUserAdvertDTO.id,
      companyUserId: this.companyUserAdvertDTO.companyUserId,
      personelUserId: this.getPersonelUserId(
        this.personelUserAdvertApplicationModel.personelUserMail
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
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

  personelUserMailClear() {
    this.personelUserAdvertApplicationModel.personelUserMail = '';
  }
}
