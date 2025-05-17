import { LocalStorageService } from './../../../services/localStorage.service';
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
import { Router } from '@angular/router';
import { City } from '../../../models/city';
import { CompanyUserAddressService } from '../../../services/companyUserAddress.service';
import { CompanyUserAddress } from '../../../models/companyUserAddress';
import { Region } from '../../../models/region';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companyUserAddressAdd',
  templateUrl: './companyUserAddressAdd.component.html',
  styleUrls: ['./companyUserAddressAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAddressAddComponent implements OnInit {
  addForm: FormGroup;
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  addressDetail: string;

  componentTitle = 'Company Address Add Form';
  userId: number;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private userService: UserService,
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private companyUserService: CompanyUserService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
    this.getCountries();
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
          this.activeModal.close();
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
      companyUserId: this.getCompanyUserId(this.addForm.value.userEmail),
      countryId: this.getCountryId(this.addForm.value.countryName),
      cityId: this.getCityId(this.addForm.value.cityName),

      regionId: this.getRegionId(this.addForm.value.regionName),
      addressDetail: this.addForm.value.addressDetail,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (error) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.addForm.value.userEmail);

    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data.filter((f) => f.userId === userId);
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
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
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

  getCompanyUserId(email: string): number {
    const companyUserId = this.userDTOs.filter((c) => c.email === email)[0]?.id;

    return companyUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('companyUserName');
    value.reset();
    this.getAdminValues();
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
