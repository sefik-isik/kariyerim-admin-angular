import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { CompanyUserAdvert } from '../../../models/component/companyUserAdvert';
import { CompanyUserAdvertCity } from '../../../models/component/companyUserAdvertCity';
import { CompanyUserAdvertCityDTO } from '../../../models/dto/companyUserAdvertCityDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { CityService } from '../../../services/city.service';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { CompanyUserAdvertCityService } from '../../../services/companyUserAdvertCity.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserAdvertCityAdd',
  templateUrl: './companyUserAdvertCityAdd.component.html',
  styleUrls: ['./companyUserAdvertCityAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertCityAddComponent implements OnInit {
  companyUserAdvertCityModel: CompanyUserAdvertCityDTO =
    {} as CompanyUserAdvertCityDTO;
  userDTOs: UserDTO[] = [];
  companyUsers: CompanyUserDTO[] = [];
  companyUserAdverts: CompanyUserAdvert[] = [];
  workCities: City[] = [];
  admin: boolean = false;
  componentTitle = 'Company Advert City Add Form';

  constructor(
    private companyUserAdvertCityService: CompanyUserAdvertCityService,
    private companyUserAdvertService: CompanyUserAdvertService,
    private workCitieService: CityService,
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getWorkCities();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAdvertCityService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuseradvertcity/companyuseradvertcitylisttab',
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

  getModel(): CompanyUserAdvertCity {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.companyUserAdvertCityModel.email),
      companyUserId: this.getCompanyUserId(
        this.companyUserAdvertCityModel.companyUserName
      ),
      advertId: this.getCompanyUserAdvertId(
        this.companyUserAdvertCityModel.advertName
      ),
      workCityId: this.getWorkCityId(
        this.companyUserAdvertCityModel.workCityName
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
        this.getCompanyUserAdverts(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserAdvertCityModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.companyUserAdvertCityModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.companyUserAdvertCityModel.email);

    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUsers = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUserAdverts(adminModel: AdminModel) {
    this.companyUserAdvertService.getAll(adminModel).subscribe(
      (response) => {
        this.companyUserAdverts = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getWorkCities() {
    this.workCitieService.getAll().subscribe(
      (response) => {
        this.workCities = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUserId(email: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === email)[0]?.id;
    } else {
      userId = this.companyUserAdvertCityModel.userId;
    }

    return userId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyUserId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  getCompanyUserAdvertId(companyUserAdvertName: string): string {
    const companyUserAdvertId = this.companyUserAdverts.filter(
      (w) => w.advertName === companyUserAdvertName
    )[0]?.id;

    return companyUserAdvertId;
  }

  getWorkCityId(workCityName: string): string {
    const workCityId = this.workCities.filter(
      (w) => w.cityName === workCityName
    )[0]?.id;

    return workCityId;
  }

  emailClear() {
    this.companyUserAdvertCityModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserAdvertCityModel.companyUserName = '';
  }

  advertNameClear() {
    this.companyUserAdvertCityModel.advertName = '';
  }

  workCityNameClear() {
    this.companyUserAdvertCityModel.workCityName = '';
  }
}
