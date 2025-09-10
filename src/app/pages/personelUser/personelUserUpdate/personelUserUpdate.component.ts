import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { DriverLicence } from '../../../models/component/driverLicence';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { PersonelUser } from '../../../models/component/personelUser';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { CityService } from '../../../services/city.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { ValidationService } from '../../../services/validation.service';
import { DriverLicenceService } from './../../../services/driverLicense.service';
import { LicenseDegreeService } from './../../../services/licenseDegree.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personelUserUpdate',
  templateUrl: './personelUserUpdate.component.html',
  styleUrls: ['./personelUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserUpdateComponent implements OnInit {
  @Input() personelUserDTO: PersonelUserDTO;
  cities: City[] = [];
  licenseDegrees: LicenseDegree[] = [];
  driverLicences: DriverLicence[] = [];
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Update Form';

  constructor(
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private router: Router,
    private cityService: CityService,
    private licenseDegreeService: LicenseDegreeService,
    private driverLicenceService: DriverLicenceService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCities();
    this.getLicenseDegrees();
    this.getLDriverLicences();

    setTimeout(() => {
      this.getUserValues(this.personelUserDTO.id);
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
    this.personelUserService.getById(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTO.dateOfBirth = this.formatDate(
          response.data.dateOfBirth
        );
        if (this.personelUserDTO.dateOfBirth == '1899-12-31') {
          this.dateOfBirthClear();
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserService.update(this.getModel()).subscribe(
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
      id: this.personelUserDTO.id,
      userId: this.personelUserDTO.userId,
      identityNumber: this.setNullValue(this.personelUserDTO.identityNumber),
      licenseDegreeId: this.getLicenseDegreeId(
        this.personelUserDTO.licenseDegreeName
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.personelUserDTO.driverLicenceName
      ),
      title: this.personelUserDTO.title,
      militaryStatus: this.personelUserDTO.militaryStatus,
      nationalStatus: this.personelUserDTO.nationalStatus,
      retirementStatus: this.personelUserDTO.retirementStatus,
      gender: this.personelUserDTO.gender,
      birthPlaceId: this.getBirthPlaceId(this.personelUserDTO.birthPlaceName),
      dateOfBirth: new Date(
        this.setNullDateValue(this.personelUserDTO.dateOfBirth)
      ).toJSON(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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

  getLicenseDegreeName(licenseDegreeId: string) {
    return this.licenseDegrees.find((f) => f.id == licenseDegreeId)
      .licenseDegreeName;
  }

  getDriverLicenceName(driverLicenceId: string) {
    return this.driverLicences.find((f) => f.id == driverLicenceId)
      .driverLicenceName;
  }

  getBirthPlaceName(birthPlaceId: string) {
    return this.cities.find((f) => f.id == birthPlaceId).cityName;
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.personelUserDTO.birthPlaceId = response.data.filter(
          (f) => f.cityName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.cities = response.data.filter((f) => f.cityName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLicenseDegrees() {
    this.licenseDegreeService.getAll().subscribe(
      (response) => {
        this.personelUserDTO.licenseDegreeId = response.data.filter(
          (f) => f.licenseDegreeName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.licenseDegrees = response.data.filter(
          (f) => f.licenseDegreeName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.personelUserDTO.driverLicenceId = response.data.filter(
          (f) => f.driverLicenceName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.driverLicences = response.data.filter(
          (f) => f.driverLicenceName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLicenseDegreeId(licenseDegreeName: string): string {
    let licenseDegreeId: string;

    licenseDegreeName == null ||
    licenseDegreeName == '' ||
    licenseDegreeName == '-'
      ? (licenseDegreeId = this.personelUserDTO.licenseDegreeId)
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
      ? (driverLicenceId = this.personelUserDTO.driverLicenceId)
      : (driverLicenceId = this.driverLicences.filter(
          (c) => c.driverLicenceName === driverLicenceName
        )[0]?.id);

    return driverLicenceId;
  }

  getBirthPlaceId(cityName: string): string {
    let cityId: string;

    cityName == null || cityName == '' || cityName == '-'
      ? (cityId = this.personelUserDTO.birthPlaceId)
      : (cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id);

    return cityId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // onlyNumberKey($event: KeyboardEvent) {
  //   const pattern = /[0-9\ ]/;
  //   const inputChar = String.fromCharCode($event.charCode);
  //   if (!pattern.test(inputChar)) {
  //     $event.preventDefault();
  //   }
  // }

  emailClear() {
    this.personelUserDTO.email = '';
  }

  identityNumberClear() {
    this.personelUserDTO.identityNumber = '';
  }

  licenseDegreeNameClear() {
    this.personelUserDTO.licenseDegreeName = '';
  }

  driverLicenceNameClear() {
    this.personelUserDTO.driverLicenceName = '';
  }

  birthPlaceNameClear() {
    this.personelUserDTO.birthPlaceName = '';
  }

  dateOfBirthClear() {
    this.personelUserDTO.dateOfBirth = '';
  }

  titleNameClear() {
    this.personelUserDTO.title = '';
  }
}
