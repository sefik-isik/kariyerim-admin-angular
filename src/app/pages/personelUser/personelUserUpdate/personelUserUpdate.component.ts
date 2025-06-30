import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { DriverLicenceService } from './../../../services/driverLicense.service';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { LicenseDegreeService } from './../../../services/licenseDegree.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/component/city';
import { UserService } from '../../../services/user.service';
import { PersonelUser } from '../../../models/component/personelUser';
import { DriverLicence } from '../../../models/component/driverLicence';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserUpdate',
  templateUrl: './personelUserUpdate.component.html',
  styleUrls: ['./personelUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserUpdateComponent implements OnInit {
  @Input() personelUserDTO: PersonelUserDTO;
  userDTOs: UserDTO[] = [];
  cities: City[] = [];
  licenseDegrees: LicenseDegree[] = [];
  driverLicences: DriverLicence[] = [];
  today: number = Date.now();
  componentTitle = 'Personel User Update Form';

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
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
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
        this.personelUserDTO.id = response.data.id;
        this.personelUserDTO.userId = response.data.userId;
        this.personelUserDTO.email = this.personelUserDTO.email;
        this.personelUserDTO.identityNumber = response.data.identityNumber;
        this.personelUserDTO.licenseDegreeId = response.data.licenseDegreeId;
        this.personelUserDTO.driverLicenceId = response.data.driverLicenceId;
        this.personelUserDTO.birthPlaceId = response.data.birthPlaceId;
        this.personelUserDTO.dateOfBirth = this.formatDate(
          response.data.dateOfBirth
        );
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserService.update(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personeluser/personeluserlisttab']);
        },
        (responseError) => {
          console.error;
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
      identityNumber: this.personelUserDTO.identityNumber,
      licenseDegreeId: this.getLicenseDegreeId(
        this.personelUserDTO.licenseDegreeName
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.personelUserDTO.driverLicenceName
      ),
      militaryStatus: this.personelUserDTO.militaryStatus,
      nationalStatus: this.personelUserDTO.nationalStatus,
      retirementStatus: this.personelUserDTO.retirementStatus,
      gender: this.personelUserDTO.gender,
      birthPlaceId: this.getBirthPlaceId(this.personelUserDTO.birthPlaceName),
      dateOfBirth: new Date(this.personelUserDTO.dateOfBirth).toJSON(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues(this.personelUserDTO.id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
      },
      (responseError) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getUserEmailById(userId: string): string {
    return this.userDTOs.find((c) => c.id == userId)?.email;
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
        this.cities = response.data;
      },
      (responseError) => console.error
    );
  }

  getLicenseDegrees() {
    this.licenseDegreeService.getAll().subscribe(
      (response) => {
        this.licenseDegrees = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (responseError) => console.error
    );
  }

  getLDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.driverLicences = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (responseError) => console.error
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getLicenseDegreeId(licenseDegreeName: string): string {
    const licenseDegreeId = this.licenseDegrees.filter(
      (c) => c.licenseDegreeName === licenseDegreeName
    )[0]?.id;

    return licenseDegreeId;
  }

  getDriverLicenceId(driverLicenceName: string): string {
    const driverLicenceId = this.driverLicences.filter(
      (c) => c.driverLicenceName === driverLicenceName
    )[0]?.id;

    return driverLicenceId;
  }

  getBirthPlaceId(cityName: string): string {
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;
    return cityId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onlyNumberKey($event: KeyboardEvent) {
    const pattern = /[0-9\ ]/;
    const inputChar = String.fromCharCode($event.charCode);
    if (!pattern.test(inputChar)) {
      $event.preventDefault();
    }
  }

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
}
