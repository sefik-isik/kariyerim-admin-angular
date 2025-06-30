import { CountryService } from './../../../services/country.service';
import { City } from '../../../models/component/city';
import { Component, Input, OnInit } from '@angular/core';

import { CityService } from '../../../services/city.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Country } from '../../../models/component/country';
import { Region } from '../../../models/component/region';
import { RegionService } from '../../../services/region.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { PersonelUserAddressDTO } from '../../../models/dto/personelUserAddressDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserAddressUpdate',
  templateUrl: './personelUserAddressUpdate.component.html',
  styleUrls: ['./personelUserAddressUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserAddressUpdateComponent implements OnInit {
  @Input() personelUserAddressDTO: PersonelUserAddressDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  cities: City[] = [];
  countries: Country[] = [];
  regions: Region[] = [];
  users: UserDTO[] = [];
  id: string;
  personelUserId: string;
  personelUserName: string;
  userEmail: string;
  countrId: string;
  cityId: string;
  regionId: string;
  addressDetail: string;
  addressDetailCount: number;

  componentTitle = 'Personel User Address Update Form';

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getCountries();

    setTimeout(() => {
      this.getUserValues(this.personelUserAddressDTO.id);
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
    this.personelUserAddressService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserAddressDTO.id = response.data.id;
        this.personelUserAddressDTO.personelUserId =
          response.data.personelUserId;
        this.personelUserAddressDTO.cityId = response.data.cityId;
        this.personelUserAddressDTO.regionId = response.data.regionId;
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
      this.personelUserAddressService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personeluseraddress/personeluseraddresslisttab',
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

  getModel(): PersonelUserAddressDTO {
    return Object.assign({
      id: this.personelUserAddressDTO.id,
      userId: this.personelUserAddressDTO.userId,
      personelUserId: this.personelUserAddressDTO.personelUserId,
      countryId: this.getCountryId(this.personelUserAddressDTO.countryName),
      cityId: this.getCityId(this.personelUserAddressDTO.cityName),
      regionId: this.getRegionId(this.personelUserAddressDTO.regionName),
      addressDetail: this.personelUserAddressDTO.addressDetail,
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
      cityId = this.personelUserAddressDTO.cityId;
    }
    return cityId;
  }

  getRegionId(regionName: string): string {
    let regionId = this.regions.filter((c) => c.regionName == regionName)[0]
      ?.id;
    if (regionId == undefined) {
      regionId = this.personelUserAddressDTO.regionId;
    }
    return regionId;
  }

  countryNameClear() {
    this.personelUserAddressDTO.countryName = '';
  }

  cityNameClear() {
    this.personelUserAddressDTO.cityName = '';
  }

  regionNameClear() {
    this.personelUserAddressDTO.regionName = '';
  }

  addressClear() {
    this.personelUserAddressDTO.addressDetail = '';
  }
}
