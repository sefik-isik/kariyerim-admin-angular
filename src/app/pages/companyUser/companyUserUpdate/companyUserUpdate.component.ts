import { AdminModel } from '../../../models/auth/adminModel';
import { Sector } from '../../../models/component/sector';
import { City } from '../../../models/component/city';
import { Component, Input, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompanyUser } from '../../../models/component/companyUser';
import { CompanyUserService } from '../../../services/companyUser.service';
import { SectorService } from '../../../services/sectorService';
import { TaxOffice } from '../../../models/component/taxOffice';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { CaseService } from '../../../services/helperServices/case.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserUpdate',
  templateUrl: './companyUserUpdate.component.html',
  styleUrls: ['./companyUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserUpdateComponent implements OnInit {
  @Input() companyUserDTO: CompanyUserDTO;
  companyUserDTOs: CompanyUserDTO[];
  sectors: Sector[];
  cities: City[];
  taxOffices: TaxOffice[];
  userDTOs: UserDTO[] = [];
  aboutDetail: number;
  today: number = Date.now();
  componentTitle = 'Company User Update Form';

  constructor(
    private companyUserService: CompanyUserService,
    private sectorService: SectorService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private caseService: CaseService,
    private localStorageService: LocalStorageService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getSectors();
    this.getCities();

    setTimeout(() => {
      this.getUserValues(this.companyUserDTO.id);
    }, 200);
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
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
    this.companyUserService.getById(adminModel).subscribe(
      (response) => {
        this.companyUserDTO.id = response.data.id;
        this.companyUserDTO.userId = response.data.userId;
        this.companyUserDTO.email = this.companyUserDTO.email;
        this.companyUserDTO.sectorId = response.data.sectorId;
        this.companyUserDTO.taxCityId = response.data.taxCityId;
        this.companyUserDTO.taxOfficeId = response.data.taxOfficeId;
        this.companyUserDTO.taxNumber = response.data.taxNumber;
        this.companyUserDTO.yearOfEstablishment = this.formatDate(
          response.data.yearOfEstablishment
        );
        this.companyUserDTO.workerCount = response.data.workerCount;
        this.companyUserDTO.webAddress = response.data.webAddress;
        this.companyUserDTO.clarification = response.data.clarification;
        this.companyUserDTO.about = response.data.about;

        this.getAdminValues();
      },
      (responseError) => console.error
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.activeModal.close();
          this.router.navigate(['/dashboard/companyuser/companyuserlisttab']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUser {
    return Object.assign({
      id: this.companyUserDTO.id,
      userId: this.companyUserDTO.userId,
      companyUserName: this.caseService.capitalizeFirstLetter(
        this.companyUserDTO.companyUserName
      ),
      sectorId: this.getsectorId(this.companyUserDTO.sectorName),
      taxCityId: this.getCityId(this.companyUserDTO.taxCityName),
      taxOfficeId: this.getTaxOfficeId(this.companyUserDTO.taxOfficeName),
      taxNumber: this.companyUserDTO.taxNumber,
      yearOfEstablishment: new Date(
        this.companyUserDTO.yearOfEstablishment
      ).toJSON(),
      workerCount: this.companyUserDTO.workerCount,
      webAddress: this.caseService.capitalizeToLower(
        this.companyUserDTO.webAddress
      ),
      clarification: this.companyUserDTO.clarification,
      about: this.companyUserDTO.about,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.companyUserDTO.id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.log(responseError)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (responseError) => console.log(responseError)
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

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
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

  getsectorId(sectorName: string): string {
    return this.sectors.find(
      (c) => c.sectorName.toLocaleLowerCase() == sectorName.toLocaleLowerCase()
    )?.id;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCityId(cityName: string): string {
    return this.cities.find(
      (c) => c.cityName.toLocaleLowerCase() == cityName.toLocaleLowerCase()
    )?.id;
  }

  getTaxOfficeId(taxOfficeName: string): string {
    if (this.taxOffices) {
      return this.taxOffices.find(
        (c) =>
          c.taxOfficeName.toLocaleLowerCase() ==
          taxOfficeName.toLocaleLowerCase()
      )?.id;
    } else {
      return this.companyUserDTO.taxOfficeId;
    }
  }

  count() {
    this.aboutDetail = this.companyUserDTO.about.length;
  }

  companyUserNameClear() {
    this.companyUserDTO.companyUserName = '';
  }

  sectorNameClear() {
    this.companyUserDTO.sectorName = '';
  }

  taxCityNameClear() {
    this.companyUserDTO.taxCityName = '';
  }

  taxOfficeNameClear() {
    this.companyUserDTO.taxOfficeName = '';
  }

  taxNumberClear() {
    this.companyUserDTO.taxNumber = '';
  }

  workerCountClear() {
    this.companyUserDTO.workerCount = '';
  }

  webAddressClear() {
    this.companyUserDTO.webAddress = '';
  }

  yearOfEstablishmentClear() {
    this.companyUserDTO.yearOfEstablishment = '';
  }

  clarificationClear() {
    this.companyUserDTO.clarification = '';
  }

  aboutClear() {
    this.companyUserDTO.about = '';
  }
}
