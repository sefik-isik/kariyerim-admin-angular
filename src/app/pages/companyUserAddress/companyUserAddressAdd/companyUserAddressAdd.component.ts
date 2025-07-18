import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { RegionService } from './../../../services/region.service';
import { CityService } from './../../../services/city.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/component/country';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { City } from '../../../models/component/city';
import { CompanyUserAddressService } from '../../../services/companyUserAddress.service';
import { CompanyUserAddress } from '../../../models/component/companyUserAddress';
import { Region } from '../../../models/component/region';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAddressDTO } from '../../../models/dto/companyUserAddressDTO';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUser } from '../../../models/component/companyUser';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserAddressAdd',
  templateUrl: './companyUserAddressAdd.component.html',
  styleUrls: ['./companyUserAddressAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAddressAddComponent implements OnInit {
  companyUserAddressModel: CompanyUserAddressDTO = {} as CompanyUserAddressDTO;
  userDTOs: UserDTO[] = [];
  companyUsers: CompanyUser[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  addressDetailCount: number;
  admin: boolean = false;
  componentTitle = 'Company Address Add Form';

  constructor(
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
    private companyUserService: CompanyUserService,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getCountries();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAddressService.add(this.getModel()).subscribe(
        (response) => {
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
      id: '',
      userId: this.getUserId(this.companyUserAddressModel.email.trim()),
      companyUserId: this.getCompanyUserId(
        this.companyUserAddressModel.companyUserName.trim()
      ),
      countryId: this.getCountryId(
        this.companyUserAddressModel.countryName.trim()
      ),
      cityId: this.getCityId(this.companyUserAddressModel.cityName.trim()),
      regionId: this.getRegionId(
        this.companyUserAddressModel.regionName.trim()
      ),
      addressDetail: this.companyUserAddressModel.addressDetail.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserAddressModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.companyUserAddressModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAll(adminModel).subscribe(
      (response) => {
        this.companyUsers = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  count() {
    this.addressDetailCount = this.companyUserAddressModel.addressDetail.length;
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data.filter((f) => f.countryName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCities(countryName: string) {
    this.cityService.getAll().subscribe(
      (response) => {
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
        this.regions = response.data
          .filter((r) => r.cityId === this.getCityId(cityName))
          .filter((f) => f.regionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    return userId;
  }

  getCountryId(countryName: string): string {
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  getCityId(cityName: string): string {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    return cityId;
  }

  getRegionId(regionName: string): string {
    const regionId = this.regions.filter((c) => c.regionName === regionName)[0]
      ?.id;

    return regionId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyUserId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  emailClear() {
    this.companyUserAddressModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserAddressModel.companyUserName = '';
  }

  countryNameClear() {
    this.companyUserAddressModel.countryName = '';
  }

  cityNameClear() {
    this.companyUserAddressModel.cityName = '';
  }

  regionNameClear() {
    this.companyUserAddressModel.regionName = '';
  }

  addressClear() {
    this.companyUserAddressModel.addressDetail = '';
  }
}
