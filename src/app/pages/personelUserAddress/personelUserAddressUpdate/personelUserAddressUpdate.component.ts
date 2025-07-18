import { Component, Input, OnInit } from '@angular/core';
import { City } from '../../../models/component/city';
import { CountryService } from './../../../services/country.service';

import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../../../models/component/country';
import { Region } from '../../../models/component/region';
import { PersonelUserAddressDTO } from '../../../models/dto/personelUserAddressDTO';
import { CityService } from '../../../services/city.service';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { RegionService } from '../../../services/region.service';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserAddressUpdate',
  templateUrl: './personelUserAddressUpdate.component.html',
  styleUrls: ['./personelUserAddressUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserAddressUpdateComponent implements OnInit {
  @Input() personelUserAddressDTO: PersonelUserAddressDTO;
  cities: City[] = [];
  countries: Country[] = [];
  regions: Region[] = [];
  addressDetail: string;
  addressDetailCount: number;
  admin: boolean = false;
  componentTitle = 'Personel User Address Update Form';

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private toastrService: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCountries();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserAddressService.update(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personeluseraddress/personeluseraddresslisttab',
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

  getModel(): PersonelUserAddressDTO {
    return Object.assign({
      id: this.personelUserAddressDTO.id,
      userId: this.personelUserAddressDTO.userId,
      personelUserId: this.personelUserAddressDTO.personelUserId,
      countryId: this.getCountryId(
        this.personelUserAddressDTO.countryName.trim()
      ),
      cityId: this.getCityId(this.personelUserAddressDTO.cityName.trim()),
      regionId: this.getRegionId(this.personelUserAddressDTO.regionName.trim()),
      addressDetail: this.personelUserAddressDTO.addressDetail.trim(),
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
