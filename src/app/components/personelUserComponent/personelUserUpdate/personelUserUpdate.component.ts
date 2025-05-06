import { DriverLicenceService } from './../../../services/driverLicense.service';
import { LicenceDegree } from './../../../models/licenceDegree';
import { LicenceDegreeService } from './../../../services/licenseDegree.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { UserDTO } from '../../../models/userDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserCode } from '../../../models/userCodes';
import { PersonelUser } from '../../../models/personelUser';
import { DriverLicence } from '../../../models/driverLicence';

@Component({
  selector: 'app-personelUserUpdate',
  templateUrl: './personelUserUpdate.component.html',
  styleUrls: ['./personelUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserUpdateComponent implements OnInit {
  componentTitle = 'Personel User Update Form';
  users: UserDTO[] = [];
  cities: City[] = [];
  id: number;
  userEmail: string;
  identityNumber: string;
  licenceDegrees: LicenceDegree[] = [];
  licenceDegreeId: number;
  driverLicences: DriverLicence[] = [];
  driverLicenceId: number;
  birthPlaceId: number;
  dateOfBirth: string;
  updateForm: FormGroup;
  userId: number;
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private router: Router,
    private cityService: CityService,
    private userService: UserService,
    private localStorageService: LocalStorageService,

    private licenceDegreeService: LicenceDegreeService,
    private driverLicenceService: DriverLicenceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getUsers();
    this.getCities();
    this.getLicenceDegrees();
    this.getLDriverLicences();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getById(params['personeluserId']);
      });
    }, 500);
  }

  createAddForm() {
    this.updateForm = this.formBuilder.group({
      userEmail: [''],
      identityNumber: [''],
      licenceDegreeName: [''],
      driverLicenceName: [''],
      gender: [''],
      militaryStatus: [''],
      nationalStatus: [''],
      retirementStatus: [''],
      birthPlaceName: [''],
      dateOfBirth: [''],
    });
  }

  getById(id: number) {
    this.personelUserService.getById(id).subscribe(
      (response) => {
        this.id = response.data.id;
        this.userId = response.data.userId;
        this.userEmail = this.getUserEmailById(this.userId);
        this.identityNumber = response.data.identityNumber;
        this.licenceDegreeId = response.data.licenceDegreeId;
        this.driverLicenceId = response.data.driverLicenceId;
        this.birthPlaceId = response.data.birthPlaceId;
        this.dateOfBirth = this.formatDate(response.data.dateOfBirth);

        this.updateForm.patchValue({
          userEmail: this.userEmail,
          identityNumber: response.data.identityNumber,
          licenceDegreeName: this.getLicenceDegreeName(this.licenceDegreeId),
          driverLicenceName: this.getDriverLicenceName(this.driverLicenceId),
          birthPlaceName: this.getBirthPlaceName(this.birthPlaceId),
          gender: response.data.gender,
          dateOfBirth: this.dateOfBirth,
          militaryStatus: response.data.militaryStatus,
          nationalStatus: response.data.nationalStatus,
          retirementStatus: response.data.retirementStatus,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.getModel().id > 0 &&
      this.getModel().userId > 0 &&
      this.getModel().licenceDegreeId > 0 &&
      this.getModel().driverLicenceId > 0 &&
      this.getModel().birthPlaceId > 0
    ) {
      this.personelUserService.update(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusers']);
        },
        (error) => {
          this.toastrService.error(error.error.message);
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUser {
    return Object.assign({
      id: this.id,
      userId: this.getUserId(this.updateForm.value.userEmail),
      identityNumber: this.updateForm.value.identityNumber,
      licenceDegreeId: this.getLicenceDegreeId(
        this.updateForm.value.licenceDegreeName
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.updateForm.value.driverLicenceName
      ),
      militaryStatus: this.updateForm.value.militaryStatus,
      nationalStatus: this.updateForm.value.nationalStatus,
      retirementStatus: this.updateForm.value.retirementStatus,
      gender: this.updateForm.value.gender,
      birthPlaceId: this.getBirthPlaceId(this.updateForm.value.birthPlaceName),
      dateOfBirth: new Date(this.updateForm.value.dateOfBirth).toJSON(),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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

  getUserEmailById(userId: number): string {
    return this.users.find((c) => c.id == userId)?.email;
  }

  getLicenceDegreeName(licenceDegreeId: number) {
    return this.licenceDegrees.find((f) => f.id == licenceDegreeId)
      .licenceDegreeName;
  }

  getDriverLicenceName(driverLicenceId: number) {
    return this.driverLicences.find((f) => f.id == driverLicenceId)
      .driverLicenceName;
  }

  getBirthPlaceName(birthPlaceId: number) {
    return this.cities.find((f) => f.id == birthPlaceId).cityName;
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (error) => console.error
    );
  }

  getLicenceDegrees() {
    this.licenceDegreeService.getAll().subscribe(
      (response) => {
        this.licenceDegrees = response.data;
      },
      (error) => console.error
    );
  }

  getLDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.driverLicences = response.data;
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.users.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getLicenceDegreeId(licenceDegreeName: string): number {
    const licenceDegreeId = this.licenceDegrees.filter(
      (c) => c.licenceDegreeName === licenceDegreeName
    )[0]?.id;

    return licenceDegreeId;
  }

  getDriverLicenceId(driverLicenceName: string): number {
    const driverLicenceId = this.driverLicences.filter(
      (c) => c.driverLicenceName === driverLicenceName
    )[0]?.id;

    return driverLicenceId;
  }

  getBirthPlaceId(cityName: string): number {
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

  clearInput1() {
    let value = this.updateForm.get('userEmail');
    value.reset();
    this.getUsers();
  }

  clearInput2() {
    let value = this.updateForm.get('identityNumber');
    value.reset();
  }

  clearInput3() {
    let value = this.updateForm.get('licenceDegreeName');
    value.reset();
    this.getLDriverLicences();
  }

  clearInput4() {
    let value = this.updateForm.get('driverLicenceName');
    value.reset();
    this.getCities();
  }

  clearInput5() {
    let value = this.updateForm.get('birthPlaceName');
    value.reset();
  }

  clearInput6() {
    let value = this.updateForm.get('dateOfBirth');
    value.reset();
  }
}
