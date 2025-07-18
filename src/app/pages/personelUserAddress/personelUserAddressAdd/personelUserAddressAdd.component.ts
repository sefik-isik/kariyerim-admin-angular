import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
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
import { Region } from '../../../models/component/region';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { PersonelUserAddress } from '../../../models/component/personelUserAddress';
import { PersonelUserService } from '../../../services/personelUser.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddressDTO } from '../../../models/dto/personelUserAddressDTO';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserAddressAdd',
  templateUrl: './personelUserAddressAdd.component.html',
  styleUrls: ['./personelUserAddressAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserAddressAddComponent implements OnInit {
  personelUserAddressModel: PersonelUserAddressDTO =
    {} as PersonelUserAddressDTO;
  personelUserDTOs: PersonelUserDTO[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  addressDetailCount: number;
  userDTOs: UserDTO[] = [];
  admin: boolean = false;
  componentTitle = 'Personel Address Add Form';

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private personelUserAddressService: PersonelUserAddressService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
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
      this.personelUserAddressService.add(this.getModel()).subscribe(
        (response) => {
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

  getModel(): PersonelUserAddress {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserAddressModel.email.trim()),
      personelUserId: this.getPersonelUserId(
        this.getUserId(this.personelUserAddressModel.email.trim())
      ),

      countryId: this.getCountryId(
        this.personelUserAddressModel.countryName.trim()
      ),

      cityId: this.getCityId(this.personelUserAddressModel.cityName.trim()),

      regionId: this.getRegionId(
        this.personelUserAddressModel.regionName.trim()
      ),
      addressDetail: this.personelUserAddressModel.addressDetail.trim(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.personelUserAddressModel.email = response.data[0].email;
          this.personelUserAddressModel.userId = response.data[0].id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  count() {
    this.addressDetailCount =
      this.personelUserAddressModel.addressDetail.length;
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
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserAddressModel.userId;
    }

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

  getPersonelUserId(userId: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.userId === userId
    )[0]?.id;

    return personelUserId;
  }

  emailClear() {
    this.personelUserAddressModel.email = '';
  }

  countryNameClear() {
    this.personelUserAddressModel.countryName = '';
  }

  cityNameClear() {
    this.personelUserAddressModel.cityName = '';
  }

  regionNameClear() {
    this.personelUserAddressModel.regionName = '';
  }

  addressClear() {
    this.personelUserAddressModel.addressDetail = '';
  }
}
