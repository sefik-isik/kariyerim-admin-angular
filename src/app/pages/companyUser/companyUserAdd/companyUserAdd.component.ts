import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDTO } from '../../../models/dto/userDTO';
import { TaxOffice } from '../../../models/component/taxOffice';
import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SectorService } from '../../../services/sectorService';
import { CompanyUser } from '../../../models/component/companyUser';
import { Sector } from '../../../models/component/sector';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/component/city';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { UserService } from '../../../services/user.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';

@Component({
  selector: 'app-companyUserAdd',
  templateUrl: './companyUserAdd.component.html',
  styleUrls: ['./companyUserAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAddComponent implements OnInit {
  companyUserModel: CompanyUserDTO = {} as CompanyUserDTO;
  sectors: Sector[] = [];
  cities: City[] = [];
  taxOffices: TaxOffice[] = [];
  userDTOs: UserDTO[] = [];
  aboutDetail: number;
  today: number = Date.now();
  componentTitle = 'Company User Add Form';

  constructor(
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private router: Router,
    private companyUserService: CompanyUserService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private userService: UserService,
    private adminService: AdminService,
    private caseService: CaseService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getSectors();
    this.getCities();
    this.getAdminValues();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/companyuser/companyuserlisttab']);
        },
        (responseError) => {
          console.error(responseError);
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
      taxNumber: this.companyUserModel.taxNumber,
      yearOfEstablishment: new Date(
        this.companyUserModel.yearOfEstablishment
      ).toJSON(),
      workerCount: this.companyUserModel.workerCount,
      webAddress: this.caseService.capitalizeToLower(
        this.companyUserModel.webAddress
      ),
      clarification: this.companyUserModel.clarification,
      about: this.companyUserModel.about,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getUsers(response);
      },
      (responseError) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (responseError) => console.error
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (responseError) => console.error
    );
  }

  getTaxOffices(taxCityName: string) {
    if (taxCityName == null) {
      return;
    }
    this.taxOfficeService.getAll().subscribe(
      (response) => {
        this.taxOffices = response.data.filter(
          (f) => f.cityId === this.getCityId(taxCityName)
        );
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getSectorId(sectorName: string): string {
    const companyUserSectorId = this.sectors.filter(
      (c) => c.sectorName === sectorName
    )[0]?.id;

    return companyUserSectorId;
  }

  getCityId(cityName: string): string {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;
    return cityId;
  }

  getTaxOfficeId(taxOfficeName: string): string {
    const taxOfficeId = this.taxOffices.filter(
      (c) => c.taxOfficeName === taxOfficeName
    )[0]?.id;

    return taxOfficeId;
  }

  count() {
    this.aboutDetail = this.companyUserModel.about.length;
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

  workerCountClear() {
    this.companyUserModel.workerCount = '';
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
