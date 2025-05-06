import { AuthService } from './../../../services/auth.service';
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
import { Region } from '../../../models/region';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserCode } from '../../../models/userCodes';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { PersonelUserAddress } from '../../../models/personelUserAddress';

@Component({
  selector: 'app-personelUserAddressAdd',
  templateUrl: './personelUserAddressAdd.component.html',
  styleUrls: ['./personelUserAddressAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserAddressAddComponent implements OnInit {
  addForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  addressDetail: string;
  componentTitle = 'Personel Address Add Form';
  userId: number;
  users: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private personelUserService: PersonelUserService,
    private personelUserAddressService: PersonelUserAddressService,
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
      userEmail: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
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
      this.getModel().userId > 0 &&
      this.getModel().personelUserId > 0 &&
      this.getModel().countryId > 0 &&
      this.getModel().cityId > 0 &&
      this.getModel().regionId > 0 &&
      this.getModel().addressDetail.length >= 50
    ) {
      this.personelUserAddressService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personeluseraddresses']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserAddress {
    const userId = this.getUserId(this.addForm.value.userEmail);
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      personelUserId: this.getPersonelUserId(userId),

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
        this.users = response.data.filter((f) => f.code == PersonelUserCode);
      },
      (error) => console.error
    );
  }

  getPersonelUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    const userId = this.getUserId(this.addForm.value.userEmail);

    this.personelUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.personelUserDTOs = response.data
          .filter((f) => f.userId == userId)
          .filter((f) => f.code == PersonelUserCode);
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
        this.countries = response.data;
        this.getCities();
      },
      (error) => console.error
    );
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter(
          (c) =>
            c.countryId === this.getCountryId(this.addForm.value.countryName)
        );
      },
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        this.regions = response.data.filter(
          (r) => r.cityId === this.getCityId(this.addForm.value.cityName)
        );
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getCountryId(countryName: string): number {
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  getCityId(cityName: string): number {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    return cityId;
  }

  getRegionId(regionName: string): number {
    const regionId = this.regions.filter((c) => c.regionName === regionName)[0]
      ?.id;

    return regionId;
  }

  getPersonelUserId(userId: number): number {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.userId === userId
    )[0]?.id;

    return personelUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getUsers();
  }

  clearInput2() {
    let value = this.addForm.get('personelUserName');
    value.reset();
    this.getPersonelUsers();
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
