import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserAddressService } from './../../../services/companyUserAddress.service';
import { CountryService } from './../../../services/country.service';
import { City } from '../../../models/component/city';
import { Component, Input, OnInit } from '@angular/core';

import { CityService } from '../../../services/city.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Country } from '../../../models/component/country';
import { Region } from '../../../models/component/region';
import { RegionService } from '../../../services/region.service';
import { CompanyUserAddressDTO } from '../../../models/dto/companyUserAddressDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserAddress } from '../../../models/component/companyUserAddress';

@Component({
  selector: 'app-companyUserAddressUpdate',
  templateUrl: './companyUserAddressUpdate.component.html',
  styleUrls: ['./companyUserAddressUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAddressUpdateComponent implements OnInit {
  @Input() companyUserAddressDTO: CompanyUserAddressDTO;
  companyUsers: CompanyUserDTO[] = [];
  cities: City[] = [];
  countries: Country[] = [];
  regions: Region[] = [];
  addressDetailCount: number;
  componentTitle = 'Company User Address Update Form';

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    public activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
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
        this.companyUserAddressDTO.id = response.data.id;
        this.companyUserAddressDTO.cityId = response.data.cityId;
        this.companyUserAddressDTO.regionId = response.data.regionId;
        this.addressDetailCount = this.count(response.data.addressDetail);
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAddressService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/companyuseraddress/companyuseraddresslisttab',
          ]);
        },
        (responseError) => {
          console.error;
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
      countryId: this.getCountryId(this.companyUserAddressDTO.countryName),
      cityId: this.getCityId(this.companyUserAddressDTO.cityName),
      regionId: this.getRegionId(this.companyUserAddressDTO.regionName),
      addressDetail: this.companyUserAddressDTO.addressDetail,
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
        this.countries = response.data;
      },
      (responseError) => console.error
    );
  }

  getCities(countryName: string) {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter(
          (c) => c.countryId === this.getCountryId(countryName)
        );
      },
      (responseError) => console.error
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        this.regions = response.data.filter(
          (r) => r.cityId === this.getCityId(cityName)
        );
      },
      (responseError) => console.error
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
