import { CompanyUserAddressService } from './../../../services/companyUserAddress.service';
import { CountryService } from './../../../services/country.service';
import { City } from './../../../models/city';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CityService } from '../../../services/city.service';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Country } from '../../../models/country';
import { Region } from '../../../models/region';
import { RegionService } from '../../../services/region.service';
import { CompanyUserAddressDTO } from '../../../models/CompanyUserAddressDTO';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';

@Component({
  selector: 'app-companyUserAddressUpdate',
  templateUrl: './companyUserAddressUpdate.component.html',
  styleUrls: ['./companyUserAddressUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserAddressUpdateComponent implements OnInit {
  updateForm: FormGroup;
  companyUsers: CompanyUserDTO[] = [];
  cities: City[] = [];
  countries: Country[] = [];
  regions: Region[] = [];
  users: UserDTO[] = [];
  id: number;
  companyUserId: number;
  companyUserName: string;
  userEmail: string;
  countrId: number;
  cityId: number;
  regionId: number;
  addressDetail: string;
  addressDetailCount: number;

  componentTitle = 'Company User Address Update';

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getCountries();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['companyuseraddressId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      countryName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
      addressDetail: ['', [Validators.required, Validators.minLength(50)]],
    });
  }

  getById(id: number) {
    this.companyUserAddressService.getById(id).subscribe(
      (response) => {
        this.updateForm.patchValue({
          countryName: this.getCountryNameById(response.data.countryId),
          cityName: this.getCityNameById(response.data.cityId),
          regionName: this.getRegionNameById(response.data.regionId),
          addressDetail: response.data.addressDetail,
        });
        this.id = response.data.id;
        this.companyUserId = response.data.companyUserId;
        this.addressDetailCount = this.count(response.data.addressDetail);
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().companyUserId > 0 &&
      this.getModel().countryId > 0 &&
      this.getModel().cityId > 0 &&
      this.getModel().regionId > 0
    ) {
      this.companyUserAddressService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/companyuseraddresses']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): CompanyUserAddressDTO {
    return Object.assign({
      id: this.id,
      companyUserId: this.companyUserId,
      countryId: this.getCountryId(this.updateForm.value.countryName),
      cityId: this.getCityId(this.updateForm.value.cityName),
      regionId: this.getRegionId(this.updateForm.value.regionName),
      addressDetail: this.updateForm.value.addressDetail,
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
        this.getCities();
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        if (this.updateForm.value.countryName) {
          this.cities = response.data.filter(
            (f) =>
              f.countryId ===
              this.getCountryId(this.updateForm.value.countryName)
          );
        } else {
          this.cities = response.data;
        }
        this.getRegions();
      },
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        if (this.updateForm.value.cityName) {
          this.regions = response.data.filter(
            (f) => f.cityId === this.getCityId(this.updateForm.value.cityName)
          );
        } else {
          this.regions = response.data;
        }
      },
      (error) => console.error
    );
  }

  getCountryNameById(countryId: number): string {
    return this.countries.filter((c) => c.id == countryId)[0]?.countryName;
  }

  getCityNameById(cityId: number): string {
    return this.cities.filter((c) => c.id == cityId)[0]?.cityName;
  }

  getRegionNameById(regionId: number): string {
    return this.regions.filter((r) => r.id == regionId)[0]?.regionName;
  }

  getCountryId(countryName: string): number {
    return this.countries.filter((c) => c.countryName == countryName)[0]?.id;
  }

  getCityId(cityName: string): number {
    return this.cities.filter((c) => c.cityName == cityName)[0]?.id;
  }

  getRegionId(regionName: string): number {
    return this.regions.filter((c) => c.regionName == regionName)[0]?.id;
  }

  clearInput1() {
    let countryName = this.updateForm.get('countryName');
    countryName.reset();
    this.getCountries();
  }

  clearInput2() {
    let cityName = this.updateForm.get('cityName');
    cityName.reset();
    this.getCities();
  }

  clearInput3() {
    let cityName = this.updateForm.get('regionName');
    cityName.reset();
    this.getRegions();
  }

  clearInput4() {
    let cityName = this.updateForm.get('addressDetail');
    cityName.reset();
  }
}
