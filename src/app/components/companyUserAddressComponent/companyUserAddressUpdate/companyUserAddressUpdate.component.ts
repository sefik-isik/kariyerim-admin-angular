import { CompanyUserService } from './../../../services/companyUser.service';
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
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserCode } from '../../../models/userCodes';

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
  userId: number;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private companyUserService: CompanyUserService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getUsers();
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
        this.userId = response.data.userId;
        this.companyUserId = response.data.companyUserId;
        this.userEmail = this.getEmailByUserId(response.data.userId);
        this.companyUserName = this.getcompanyUserNameById(
          response.data.companyUserId
        );
        this.addressDetail = response.data.addressDetail;
        this.addressDetailCount = this.count(response.data.addressDetail);
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
      this.getModel().id > 0 &&
      this.getModel().userId > 0 &&
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
      userId: this.userId,
      companyUserId: this.companyUserId,
      companyUserName: this.companyUserName,
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

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
        this.getCompanyUsers();
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    const userId = this.getUserId(this.updateForm.value.userEmail);
    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUsers = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data.filter((f) => f.deletedDate == null);
        this.getCities();
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        if (this.updateForm.value.countryName) {
          this.cities = response.data
            .filter(
              (f) =>
                f.countryId ===
                this.getCountryId(this.updateForm.value.countryName)
            )
            .filter((f) => f.deletedDate == null);
        } else {
          this.cities = response.data.filter((f) => f.deletedDate == null);
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
          this.regions = response.data
            .filter(
              (f) => f.cityId === this.getCityId(this.updateForm.value.cityName)
            )
            .filter((f) => f.deletedDate == null);
        } else {
          this.regions = response.data.filter((f) => f.deletedDate == null);
        }
      },
      (error) => console.error
    );
  }

  getEmailByUserId(userId: number): string {
    return this.users.find((u) => u.id == userId)?.email;
  }

  getcompanyUserNameById(companyUserId: number): string {
    console.log(this.companyUsers);
    console.log(companyUserId);
    return this.companyUsers.filter((c) => c.id == companyUserId)[0]
      ?.companyUserName;
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

  getUserId(userEmail: string): number {
    const userId = this.users.filter((c) => c.email == userEmail)[0]?.id;

    return userId;
  }

  getCompanyUserId(companyUserName: string): number {
    return this.companyUsers.filter(
      (c) => c.companyUserName.toLowerCase() == companyUserName.toLowerCase()
    )[0]?.id;
  }

  getCountryId(countryName: string): number {
    return this.countries.filter(
      (c) => c.countryName.toLowerCase() == countryName.toLowerCase()
    )[0]?.id;
  }

  getCityId(cityName: string): number {
    return this.cities.filter(
      (c) => c.cityName.toLowerCase() == cityName.toLowerCase()
    )[0]?.id;
  }

  getRegionId(regionName: string): number {
    return this.regions.filter(
      (c) => c.regionName.toLowerCase() == regionName.toLowerCase()
    )[0]?.id;
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
