import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../../models/component/city';
import { CompanyUserAddress } from '../../../models/component/companyUserAddress';
import { Country } from '../../../models/component/country';
import { Region } from '../../../models/component/region';
import { CompanyUserAddressDTO } from '../../../models/dto/companyUserAddressDTO';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserAddressService } from './../../../services/companyUserAddress.service';
import { CountryService } from './../../../services/country.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserAddressUpdate',
  templateUrl: './companyUserAddressUpdate.component.html',
  styleUrls: ['./companyUserAddressUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAddressUpdateComponent implements OnInit {
  @Input() companyUserAddressDTO: CompanyUserAddressDTO;
  cities: City[] = [];
  countries: Country[] = [];
  regions: Region[] = [];
  addressDetailCount: number;
  admin: boolean = false;
  componentTitle = 'Company User Address Update Form';

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    public activeModal: NgbActiveModal,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCountries();

    setTimeout(() => {
      this.getUserValues(this.companyUserAddressDTO.id);
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
    this.companyUserAddressService.getById(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getCities(this.companyUserAddressDTO.countryId);
        this.getRegions(this.companyUserAddressDTO.cityId);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAddressService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuseraddress/companyuseraddresslisttab',
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

  getModel(): CompanyUserAddress {
    return Object.assign({
      id: this.companyUserAddressDTO.id,
      userId: this.companyUserAddressDTO.userId,
      companyUserId: this.companyUserAddressDTO.companyUserId,
      countryId: this.getCountryId(
        this.companyUserAddressDTO.countryName.trim()
      ),
      cityId: this.getCityId(this.companyUserAddressDTO.cityName.trim()),
      regionId: this.getRegionId(this.companyUserAddressDTO.regionName.trim()),
      addressDetail: this.companyUserAddressDTO.addressDetail.trim(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string) {
    return text.length;
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.countries = response.data.filter((f) => f.countryName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCities(countryName: string) {
    this.cityService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.cities = response.data.filter(
          (c) => c.countryId === this.getCountryId(countryName)
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.regions = response.data
          .filter((r) => r.cityId === this.getCityId(cityName))
          .filter((f) => f.regionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCountryId(countryName: string): string {
    return this.countries.filter((c) => c.countryName == countryName)[0]?.id;
  }

  getCityId(cityName: string): string {
    let cityId = this.cities.filter((c) => c.cityName == cityName)[0]?.id;

    if (cityId == undefined) {
      cityId = this.companyUserAddressDTO.cityId;
    }
    return cityId;
  }

  getRegionId(regionName: string): string {
    let regionId = this.regions.filter((c) => c.regionName == regionName)[0]
      ?.id;
    if (regionId == undefined) {
      regionId = this.companyUserAddressDTO.regionId;
    }
    return regionId;
  }

  emailClear() {
    this.companyUserAddressDTO.email = '';
  }

  companyUserNameClear() {
    this.companyUserAddressDTO.companyUserName = '';
  }

  countryNameClear() {
    this.companyUserAddressDTO.countryName = '';
  }

  cityNameClear() {
    this.companyUserAddressDTO.cityName = '';
  }

  regionNameClear() {
    this.companyUserAddressDTO.regionName = '';
  }

  addressClear() {
    this.companyUserAddressDTO.addressDetail = '';
  }
}
