import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/component/city';
import { CompanyUser } from '../../../models/component/companyUser';
import { Sector } from '../../../models/component/sector';
import { TaxOffice } from '../../../models/component/taxOffice';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { CityService } from '../../../services/city.service';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CaseService } from '../../../services/helperServices/case.service';
import { SectorService } from '../../../services/sectorService';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { ValidationService } from '../../../services/validation.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { Count } from '../../../models/component/count';
import { CountService } from '../../../services/count.service';
import { AuthService } from '../../../services/auth.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-companyUserUpdate',
  templateUrl: './companyUserUpdate.component.html',
  styleUrls: ['./companyUserUpdate.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class CompanyUserUpdateComponent implements OnInit {
  @Input() companyUserDTO: CompanyUserDTO;
  sectors: Sector[];
  cities: City[];
  taxOffices: TaxOffice[];
  counts: Count[] = [];
  editorCount: number = 0;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Company User Update Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private companyUserService: CompanyUserService,
    private sectorService: SectorService,
    private cityService: CityService,
    private taxOfficeService: TaxOfficeService,
    private countService: CountService,
    public activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private caseService: CaseService,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCounts();
    this.getSectors();
    this.getCities();
    this.getTaxOffices('-');

    setTimeout(() => {
      this.getUserValues(this.companyUserDTO.id);
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
    this.companyUserService.getById(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDTO.yearOfEstablishment = this.formatDate(
          response.data.yearOfEstablishment
        );

        if (this.companyUserDTO.yearOfEstablishment == '1899-12-31') {
          this.yearOfEstablishmentClear();
        }
        this.getTaxOffices(this.companyUserDTO.taxCityName);

        this.htmlContent = response.data.about;
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
      this.companyUserService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success(response.message, 'Başarılı');
          this.activeModal.close();
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
      id: this.companyUserDTO.id,
      userId: this.companyUserDTO.userId,
      companyUserName: this.caseService.capitalizeFirstLetter(
        this.companyUserDTO.companyUserName.trim()
      ),
      sectorId: this.getSectorId(this.companyUserDTO.sectorName),
      taxCityId: this.getCityId(this.companyUserDTO.taxCityName),
      taxOfficeId: this.getTaxOfficeId(this.companyUserDTO.taxOfficeName),
      taxNumber: this.setNullValue(this.companyUserDTO.taxNumber),
      yearOfEstablishment: new Date(
        this.setNullDateValue(this.companyUserDTO.yearOfEstablishment)
      ).toJSON(),
      workerCountId: this.getWorkerCountId(
        this.companyUserDTO.workerCountValue
      ),
      webAddress: this.setNullValue(this.companyUserDTO.webAddress),
      clarification: this.setNullValue(this.companyUserDTO.clarification),
      about: this.setNullValue(this.htmlContent),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  setNullValue(value: string) {
    if (value == '' || value == null) {
      value = '-';
    } else {
      this.caseService.capitalizeFirstLetter(value);
    }
    return value;
  }

  setNullDateValue(value: string) {
    if (value == '' || value == null) {
      value = '01.01.1900';
    }
    return value;
  }

  getCounts() {
    this.countService.getAll().subscribe(
      (response) => {
        this.companyUserDTO.workerCountId = response.data.filter(
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
        this.companyUserDTO.sectorId = response.data.filter(
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
        this.companyUserDTO.taxCityId = response.data.filter(
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
        this.companyUserDTO.taxOfficeId = response.data.filter(
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

  getSectorId(sectorName: string): string {
    let sectorId: string;

    sectorName == null || sectorName == '' || sectorName == '-'
      ? (sectorId = this.companyUserDTO.sectorId)
      : (sectorId = this.sectors.filter((c) => c.sectorName === sectorName)[0]
          ?.id);

    return sectorId;
  }

  getCityId(cityName: string): string {
    let cityId: string;

    cityName == null || cityName == '' || cityName == '-'
      ? (cityId = this.companyUserDTO.taxCityId)
      : (cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id);

    return cityId;
  }

  getTaxOfficeId(taxOfficeName: string): string {
    let taxOfficeId: string;

    taxOfficeName == null || taxOfficeName == '' || taxOfficeName == '-'
      ? (taxOfficeId = this.companyUserDTO.taxOfficeId)
      : (taxOfficeId = this.taxOffices.filter(
          (c) => c.taxOfficeName === taxOfficeName
        )[0]?.id);

    return taxOfficeId;
  }

  getWorkerCountId(countValue: string): string {
    let workerCountId: string;

    countValue == null || countValue == '' || countValue == '-'
      ? (workerCountId = this.companyUserDTO.workerCountId)
      : (workerCountId = this.counts.filter(
          (c) => c.countValue === countValue
        )[0]?.id);

    return workerCountId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  count() {
    this.editorCount = this.htmlContent.length;
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
    this.companyUserDTO.workerCountValue = '';
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
