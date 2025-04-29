import { AuthService } from './../../../services/auth.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { RegionService } from './../../../services/region.service';
import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { City } from '../../../models/city';
import { CompanyUserAddressService } from '../../../services/companyUserAddress.service';
import { CompanyUserAddress } from '../../../models/companyUserAddress';
import { Region } from '../../../models/region';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserAddressAdd',
  templateUrl: './companyUserAddressAdd.component.html',
  styleUrls: ['./companyUserAddressAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class CompanyUserAddressAddComponent implements OnInit {
  addForm: FormGroup;
  companyUserDTOs: CompanyUserDTO[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  addressDetail: string;
  componentTitle = 'Company Address Add Form';
  userId: number;
  users: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private companyUserService: CompanyUserService,
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getCountries();
    this.getUsers();
    this.checkAdmin();
  }

  checkAdmin() {
    if (this.authService.isAdmin('status')) {
      this.isAdmin = true;
    }
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      companyUserName: ['', [Validators.required, Validators.minLength(3)]],
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      countryName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
      addressDetail: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  add() {
    if (
      this.addForm.valid &&
      this.getModel().userId > 0 &&
      this.getModel().companyUserId > 0 &&
      this.getModel().countryId > 0 &&
      this.getModel().cityId > 0 &&
      this.getModel().regionId > 0
    ) {
      this.companyUserAddressService.add(this.getModel()).subscribe(
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

  getModel(): CompanyUserAddress {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      companyUserId: this.getCompanyUserId(this.addForm.value.companyUserName),
      countryId: this.getCountryId(this.addForm.value.countryName),
      cityId: this.getCityId(this.addForm.value.cityName),

      regionId: this.getRegionId(this.addForm.value.regionName),
      addressDetail: this.addForm.value.addressDetail,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.users = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    const userId = this.getUserId(this.addForm.value.userEmail);

    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUserDTOs = response.data
          .filter((f) => f.companyUserId == userId)
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  count() {
    this.addressDetail = this.addForm.value.addressDetail.length;
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
        this.cities = response.data
          .filter(
            (c) =>
              c.countryId === this.getCountryId(this.addForm.value.countryName)
          )
          .filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        this.regions = response.data
          .filter(
            (r) => r.cityId === this.getCityId(this.addForm.value.cityName)
          )
          .filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )[0]?.id;

    return userId;
  }

  getCountryId(countryName: string): number {
    const countryId = this.countries.filter(
      (c) => c.countryName.toLowerCase() === countryName.toLowerCase()
    )[0]?.id;

    return countryId;
  }

  getCityId(cityName: string): number {
    const cityId = this.cities.filter(
      (c) => c.cityName.toLowerCase() === cityName.toLowerCase()
    )[0]?.id;

    return cityId;
  }

  getRegionId(regionName: string): number {
    const regionId = this.regions.filter(
      (c) => c.regionName.toLowerCase() === regionName.toLowerCase()
    )[0]?.id;

    return regionId;
  }

  getCompanyUserId(companyUserName: string): number {
    const companyUserId = this.companyUserDTOs.filter(
      (c) => c.companyUserName.toLowerCase() === companyUserName.toLowerCase()
    )[0]?.id;

    return companyUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getUsers();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getCompanyUsers();
  }

  clearInput3() {
    let value = this.addForm.get('countryName');
    value.reset();
    this.getCountries();
  }

  clearInput4() {
    let value = this.addForm.get('cityName');
    value.reset();
    this.getCities();
  }

  clearInput5() {
    let value = this.addForm.get('regionName');
    value.reset();
    this.getRegions();
  }

  clearInput6() {
    let value = this.addForm.get('addressDetail');
    value.reset();
  }
}
