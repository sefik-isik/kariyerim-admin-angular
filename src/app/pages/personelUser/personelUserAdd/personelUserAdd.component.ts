import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { DriverLicenceService } from './../../../services/driverLicense.service';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { LicenseDegreeService } from './../../../services/licenseDegree.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/component/city';
import { UserService } from '../../../services/user.service';
import { PersonelUser } from '../../../models/component/personelUser';
import { DriverLicence } from '../../../models/component/driverLicence';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { ValidationService } from '../../../services/validation.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserAdd',
  templateUrl: './personelUserAdd.component.html',
  styleUrls: ['./personelUserAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserAddComponent implements OnInit {
  personelUserModel: PersonelUserDTO = {} as PersonelUserDTO;
  personelUsers: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  cities: City[] = [];
  licenseDegrees: LicenseDegree[] = [];
  driverLicences: DriverLicence[] = [];
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Add Form';

  constructor(
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private router: Router,
    private cityService: CityService,
    private userService: UserService,
    private adminService: AdminService,
    private licenseDegreeService: LicenseDegreeService,
    private driverLicenceService: DriverLicenceService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getCities();
    this.getLicenseDegrees();
    this.getLDriverLicences();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personeluser/personeluserlisttab']);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUser {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserModel.email),
      identityNumber: this.setNullValue(this.personelUserModel.identityNumber),
      licenseDegreeId: this.getLicenseDegreeId(
        this.personelUserModel.licenseDegreeName
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.personelUserModel.driverLicenceName
      ),
      title: this.personelUserModel.title,
      militaryStatus: this.personelUserModel.militaryStatus,
      nationalStatus: this.personelUserModel.nationalStatus,
      retirementStatus: this.personelUserModel.retirementStatus,
      gender: this.personelUserModel.gender,
      birthPlaceId: this.getBirthPlaceId(this.personelUserModel.birthPlaceName),
      dateOfBirth: new Date(
        this.setNullDateValue(this.personelUserModel.dateOfBirth)
      ).toJSON(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  setNullValue(value: string) {
    if (value == null || value == '') {
      value = '-';
    }
    return value;
  }

  setNullDateValue(value: string) {
    if (value == null || value == '') {
      value = '01.01.1900';
    }
    return value;
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.personelUserModel.email = adminModel.email;
          this.personelUserModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);

        this.personelUsers = response.data.filter(
          (f) => f.email == this.personelUserModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setPersonelUserMail(email: string) {
    this.personelUserModel.email = email;

    this.getAdminValues();
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.personelUserModel.birthPlaceId = response.data.filter(
          (f) => f.cityName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.cities = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLicenseDegrees() {
    this.licenseDegreeService.getAll().subscribe(
      (response) => {
        this.personelUserModel.licenseDegreeId = response.data.filter(
          (f) => f.licenseDegreeName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.licenseDegrees = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.personelUserModel.driverLicenceId = response.data.filter(
          (f) => f.driverLicenceName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.driverLicences = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getUserId(userEmail: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;
    } else {
      userId = this.personelUserModel.userId;
    }

    return userId;
  }

  getLicenseDegreeId(licenseDegreeName: string): string {
    let licenseDegreeId: string;

    licenseDegreeName == null ||
    licenseDegreeName == '' ||
    licenseDegreeName == '-'
      ? (licenseDegreeId = this.personelUserModel.licenseDegreeId)
      : (licenseDegreeId = this.licenseDegrees.filter(
          (c) => c.licenseDegreeName === licenseDegreeName
        )[0]?.id);

    return licenseDegreeId;
  }

  getDriverLicenceId(driverLicenceName: string): string {
    let driverLicenceId: string;

    driverLicenceName == null ||
    driverLicenceName == '' ||
    driverLicenceName == '-'
      ? (driverLicenceId = this.personelUserModel.driverLicenceId)
      : (driverLicenceId = this.driverLicences.filter(
          (c) => c.driverLicenceName === driverLicenceName
        )[0]?.id);

    return driverLicenceId;
  }

  getBirthPlaceId(cityName: string): string {
    let cityId: string;

    cityName == null || cityName == '' || cityName == '-'
      ? (cityId = this.personelUserModel.birthPlaceId)
      : (cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id);

    return cityId;
  }

  // onlyNumberKey($event: KeyboardEvent) {
  //   const pattern = /[0-9\ ]/;
  //   const inputChar = String.fromCharCode($event.charCode);
  //   if (!pattern.test(inputChar)) {
  //     $event.preventDefault();
  //   }
  // }

  emailClear() {
    this.personelUserModel.email = '';
  }

  identityNumberClear() {
    this.personelUserModel.identityNumber = '';
  }

  licenseDegreeNameClear() {
    this.personelUserModel.licenseDegreeName = '';
  }

  driverLicenceNameClear() {
    this.personelUserModel.driverLicenceName = '';
  }

  birthPlaceNameClear() {
    this.personelUserModel.birthPlaceName = '';
  }

  dateOfBirthClear() {
    this.personelUserModel.dateOfBirth = '';
  }

  titleNameClear() {
    this.personelUserModel.title = '';
  }
}
