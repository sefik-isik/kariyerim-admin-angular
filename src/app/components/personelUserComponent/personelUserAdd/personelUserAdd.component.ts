import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
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
import { Router, RouterLink } from '@angular/router';
import { CityService } from '../../../services/city.service';
import { City } from '../../../models/city';
import { UserService } from '../../../services/user.service';
import { PersonelUser } from '../../../models/personelUser';
import { DriverLicence } from '../../../models/driverLicence';

@Component({
  selector: 'app-personelUserAdd',
  templateUrl: './personelUserAdd.component.html',
  styleUrls: ['./personelUserAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserAddComponent implements OnInit {
  componentTitle = 'Personel User Add Form';
  userDTOs: UserDTO[] = [];
  cities: City[] = [];
  licenceDegrees: LicenceDegree[] = [];
  driverLicences: DriverLicence[] = [];
  addForm: FormGroup;
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
    private driverLicenceService: DriverLicenceService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
    this.getCities();
    this.getLicenceDegrees();
    this.getLDriverLicences();
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
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

  add() {
    if (
      this.getModel().userId > 0 &&
      this.getModel().identityNumber != null &&
      this.getModel().identityNumber.length == 11 &&
      this.getModel().licenceDegreeId > 0 &&
      this.getModel().driverLicenceId > 0 &&
      this.getModel().birthPlaceId > 0 &&
      this.getModel().dateOfBirth != null
    ) {
      this.personelUserService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusers']);
        },
        (error) => {
          this.toastrService.error(error.error.message, 'Kullanıcı Eklenemedi');
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUser {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      identityNumber: this.addForm.value.identityNumber,
      licenceDegreeId: this.getLicenceDegreeId(
        this.addForm.value.licenceDegreeName
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.addForm.value.driverLicenceName
      ),
      militaryStatus: this.getBooleanValue(this.addForm.value.militaryStatus),
      nationalStatus: this.getBooleanValue(this.addForm.value.nationalStatus),
      retirementStatus: this.getBooleanValue(
        this.addForm.value.retirementStatus
      ),
      gender: this.getBooleanValue(this.addForm.value.gender),
      birthPlaceId: this.getBirthPlaceId(this.addForm.value.birthPlaceName),
      dateOfBirth: new Date(this.addForm.value.dateOfBirth).toJSON(),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
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

  getBooleanValue(value: string): boolean {
    if (value == 'true') {
      return true;
    } else {
      return false;
    }
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

  onlyNumberKey($event: KeyboardEvent) {
    const pattern = /[0-9\ ]/;
    const inputChar = String.fromCharCode($event.charCode);
    if (!pattern.test(inputChar)) {
      $event.preventDefault();
    }
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('identityNumber');
    value.reset();
  }

  clearInput3() {
    let value = this.addForm.get('licenceDegreeName');
    value.reset();
    this.getLDriverLicences();
  }

  clearInput4() {
    let value = this.addForm.get('driverLicenceName');
    value.reset();
    this.getCities();
  }

  clearInput5() {
    let value = this.addForm.get('birthPlaceName');
    value.reset();
  }

  clearInput6() {
    let value = this.addForm.get('dateOfBirth');
    value.reset();
  }
}
