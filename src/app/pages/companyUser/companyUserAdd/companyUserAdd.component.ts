import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { CompanyUser } from '../../../models/component/companyUser';
import { Sector } from '../../../models/component/sector';
import { TaxOffice } from '../../../models/component/taxOffice';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { CityService } from '../../../services/city.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { SectorService } from '../../../services/sectorService';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { Count } from '../../../models/component/count';
import { CountService } from '../../../services/count.service';
import { AuthService } from '../../../services/auth.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-companyUserAdd',
  templateUrl: './companyUserAdd.component.html',
  styleUrls: ['./companyUserAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class CompanyUserAddComponent implements OnInit {
  companyUserModel: CompanyUserDTO = {} as CompanyUserDTO;
  sectors: Sector[] = [];
  cities: City[] = [];
  taxOffices: TaxOffice[] = [];
  userDTOs: UserDTO[] = [];
  counts: Count[] = [];
  aboutDetail: number = 0;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Company User Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private countService: CountService,
    private adminService: AdminService,
    private caseService: CaseService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCounts();
    this.getSectors();
    this.getCities();
    this.getAdminValues();
    this.getTaxOffices('-');
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserService.add(this.getModel()).subscribe(
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

  getModel(): CompanyUser {
    return Object.assign({
      id: '',
      companyUserName: this.caseService.capitalizeFirstLetter(
        this.companyUserModel.companyUserName
      ),
      userId: this.getUserId(this.companyUserModel.email),
      sectorId: this.getSectorId(this.companyUserModel.sectorName),
      taxCityId: this.getCityId(this.companyUserModel.taxCityName),
      taxOfficeId: this.getTaxOfficeId(this.companyUserModel.taxOfficeName),
      taxNumber: this.setNullValue(this.companyUserModel.taxNumber),
      yearOfEstablishment: new Date(
        this.setNullDateValue(this.companyUserModel.yearOfEstablishment)
      ).toJSON(),
      workerCountId: this.getWorkerCountId(
        this.companyUserModel.workerCountValue
      ),
      webAddress: this.setNullValue(this.companyUserModel.webAddress),
      clarification: this.setNullValue(this.companyUserModel.clarification),
      about: this.setNullValue(this.htmlContent),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  setNullValue(value: string) {
    if (value == null || value == '') {
      value = '-';
    } else {
      this.caseService.capitalizeFirstLetter(value);
    }
    return value;
  }

  setNullDateValue(value: string) {
    if (value == null || value == '') {
      value = '01.01.1900';
    }
    return value;
  }

  count() {
    this.aboutDetail = this.htmlContent.length;
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.companyUserModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCounts() {
    this.countService.getAll().subscribe(
      (response) => {
        this.companyUserModel.workerCountId = response.data.filter(
          (f) => f.countValue == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.counts = response.data.filter((f) => f.countValue != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.companyUserModel.sectorId = response.data.filter(
          (f) => f.sectorName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.sectors = response.data.filter((f) => f.sectorName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.companyUserModel.taxCityId = response.data.filter(
          (f) => f.cityName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.cities = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getTaxOffices(taxCityName: string) {
    this.taxOfficeService.getAll().subscribe(
      (response) => {
        this.companyUserModel.taxOfficeId = response.data.filter(
          (f) => f.taxOfficeName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        if (taxCityName == '-') {
          this.taxOffices = response.data.filter((f) => f.taxOfficeName != '-');
        } else {
          this.taxOffices = response.data
            .filter((f) => f.cityId === this.getCityId(taxCityName))
            .filter((f) => f.taxOfficeName != '-');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.companyUserModel.userId;
    }

    return userId;
  }

  getSectorId(sectorName: string): string {
    let sectorId: string;

    sectorName == null || sectorName == '' || sectorName == '-'
      ? (sectorId = this.companyUserModel.sectorId)
      : (sectorId = this.sectors.filter((c) => c.sectorName === sectorName)[0]
          ?.id);

    return sectorId;
  }

  getCityId(cityName: string): string {
    let cityId: string;

    cityName == null || cityName == '' || cityName == '-'
      ? (cityId = this.companyUserModel.taxCityId)
      : (cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id);

    return cityId;
  }

  getTaxOfficeId(taxOfficeName: string): string {
    let taxOfficeId: string;

    taxOfficeName == null || taxOfficeName == '' || taxOfficeName == '-'
      ? (taxOfficeId = this.companyUserModel.taxOfficeId)
      : (taxOfficeId = this.taxOffices.filter(
          (c) => c.taxOfficeName === taxOfficeName
        )[0]?.id);

    return taxOfficeId;
  }

  getWorkerCountId(countValue: string): string {
    let workerCountId: string;

    countValue == null || countValue == '' || countValue == '-'
      ? (workerCountId = this.companyUserModel.workerCountId)
      : (workerCountId = this.counts.filter(
          (c) => c.countValue === countValue
        )[0]?.id);

    return workerCountId;
  }

  emailClear() {
    this.companyUserModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserModel.companyUserName = '';
  }

  sectorNameClear() {
    this.companyUserModel.sectorName = '';
  }

  taxCityNameClear() {
    this.companyUserModel.taxCityName = '';
  }

  taxOfficeNameClear() {
    this.companyUserModel.taxOfficeName = '';
  }

  taxNumberClear() {
    this.companyUserModel.taxNumber = '';
  }

  workerCountValueClear() {
    this.companyUserModel.workerCountValue = '';
  }

  webAddressClear() {
    this.companyUserModel.webAddress = '';
  }

  yearOfEstablishmentClear() {
    this.companyUserModel.yearOfEstablishment = '';
  }

  clarificationClear() {
    this.companyUserModel.clarification = '';
  }

  aboutClear() {
    this.companyUserModel.about = '';
  }
}
