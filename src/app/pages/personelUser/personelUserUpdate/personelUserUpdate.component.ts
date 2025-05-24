import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { DriverLicenceService } from './../../../services/driverLicense.service';
import { LicenceDegree } from './../../../models/licenceDegree';
import { LicenceDegreeService } from './../../../services/licenseDegree.service';
import { PersonelUserService } from './../../../services/personelUser.service';
import { UserDTO } from '../../../models/userDTO';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { UserService } from '../../../services/user.service';
import { PersonelUser } from '../../../models/personelUser';
import { DriverLicence } from '../../../models/driverLicence';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personelUserUpdate',
  templateUrl: './personelUserUpdate.component.html',
  styleUrls: ['./personelUserUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserUpdateComponent implements OnInit {
  componentTitle = 'Personel User Update Form';
  @Input() personelUserDTO: PersonelUserDTO;
  userDTOs: UserDTO[] = [];
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
    private adminService: AdminService,
    private licenceDegreeService: LicenceDegreeService,
    private driverLicenceService: DriverLicenceService,

    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
    this.getCities();
    this.getLicenceDegrees();
    this.getLDriverLicences();

    setTimeout(() => {
      this.getUserValues(this.personelUserDTO.id);
    }, 200);
  }

  createAddForm() {
    this.updateForm = this.formBuilder.group({
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
  getUserValues(id: number) {
    const adminModel = {
      id: id,
      email: this.localStorageService.getFromLocalStorage('email'),
      userId: parseInt(this.localStorageService.getFromLocalStorage('id')),
      status: this.localStorageService.getFromLocalStorage('status'),
    };
    this.getById(adminModel);
  }

  getById(adminModel: AdminModel) {
    this.personelUserService.getById(adminModel).subscribe(
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
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personeluser/personeluserlisttab']);
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
      userId: this.userId,
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

  getAdminValues() {
    this.adminService.getAdminValues(this.id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
      },
      (error) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getUserEmailById(userId: number): string {
    return this.userDTOs.find((c) => c.id == userId)?.email;
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
        this.licenceDegrees = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (error) => console.error
    );
  }

  getLDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.driverLicences = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

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
    this.getAdminValues();
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
