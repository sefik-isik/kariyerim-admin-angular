import { WorkingMethodService } from './../../../services/workingMethod.service';
import { SectorService } from './../../../services/sectorService';
import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { PersonelUserCvService } from './../../../services/personelUserCv.service';
import { LocalStorageService } from './../../../services/localStorage.service';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCv } from '../../../models/personelUserCv';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/personelUserCvWorkExperienceDTO';
import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import { Region } from '../../../models/region';
import { CountryService } from '../../../services/country.service';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { Sector } from '../../../models/sector';
import { CompanyUserDepartment } from '../../../models/companyUserDepartment';
import { WorkingMethod } from '../../../models/workingMethod';

@Component({
  selector: 'app-personelUserCvWorkExperienceAdd',
  templateUrl: './personelUserCvWorkExperienceAdd.component.html',
  styleUrls: ['./personelUserCvWorkExperienceAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvWorkExperienceAddComponent implements OnInit {
  addForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  detailText: string;
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  componentTitle = 'Personel User Cv Work Experience Add Form';
  userId: number;
  userDTOs: UserDTO[] = [];
  isAdmin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private personelUserCvWorkExperienceService: PersonelUserCvWorkExperienceService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    private personelUserCvService: PersonelUserCvService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private sectorService: SectorService,
    private workingMethodService: WorkingMethodService
  ) {}

  ngOnInit() {
    this.createAddForm();
    this.getAdminValues();
    this.getSectors();
    this.getCountries();
    this.getCities();
    this.getWorkingMethods();
    this.getRegions();
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
      cvName: ['', [Validators.required, Validators.minLength(3)]],
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      companySectorName: ['', [Validators.required, Validators.minLength(3)]],
      departmentName: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required, Validators.minLength(3)]],
      workingMethodName: ['', [Validators.required, Validators.minLength(3)]],
      countryName: ['', [Validators.required, Validators.minLength(3)]],
      cityName: ['', [Validators.required, Validators.minLength(3)]],
      regionName: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      foundJobInHere: [false],
      working: [false],
      detail: [
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
      this.getModel().cvId > 0 &&
      this.getModel().companySectorId > 0 &&
      this.getModel().departmentId > 0 &&
      this.getModel().workingMethodId > 0 &&
      this.getModel().countryId > 0 &&
      this.getModel().cityId > 0 &&
      this.getModel().regionId > 0 &&
      this.getModel().detail.length >= 50
    ) {
      this.personelUserCvWorkExperienceService.add(this.getModel()).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate(['/dashboard/personelusercvworkexperiences']);
        },
        (error) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvWorkExperienceDTO {
    return Object.assign({
      userId: this.getUserId(this.addForm.value.userEmail),
      personelUserId: this.getPersonelUserId(this.addForm.value.userEmail),
      cvId: this.getPersonelUserCvId(this.addForm.value.cvName),
      companySectorId: this.CompanySectorId(
        this.addForm.value.companySectorName
      ),
      departmentId: this.getDepartmentId(this.addForm.value.departmentName),
      foundJobInHere: this.addForm.value.foundJobInHere,
      working: this.addForm.value.working,
      position: this.addForm.value.position,
      companyName: this.addForm.value.companyName,
      workingMethodId: this.getWorkingMethodId(
        this.addForm.value.workingMethodName
      ),
      countryId: this.getCountryId(this.addForm.value.countryName),
      cityId: this.getCityId(this.addForm.value.cityName),
      regionId: this.getRegionId(this.addForm.value.regionName),
      startDate: new Date(this.addForm.value.startDate).toJSON(),
      endDate: new Date(this.addForm.value.endDate).toJSON(),
      detail: this.addForm.value.detail,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getCompanyUserDepartments(response);
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

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (error) => console.error
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data.filter(
          (f) => f.userId == this.getUserId(this.addForm.value.userEmail)
        );
      },
      (error) => console.error
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.companySectors = response.data;
      },
      (error) => console.error
    );
  }

  getWorkingMethods() {
    this.workingMethodService.getAll().subscribe(
      (response) => {
        this.workingMethods = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUserDepartments(adminModel: AdminModel) {
    this.companyUserDepartmentService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDepartments = response.data;
      },
      (error) => console.error
    );
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

  getPersonelUserId(email: string): number {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  CompanySectorId(companySectorName: string) {
    const companySectorId = this.companySectors.filter(
      (c) => c.sectorName === companySectorName
    )[0]?.id;

    return companySectorId;
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

  count() {
    this.detailText = this.addForm.value.detail.length;
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getDepartmentId(departmentName: string): number {
    const departmentId = this.companyUserDepartments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  getWorkingMethodId(workingMethodName: string): number {
    const departmentId = this.workingMethods.filter(
      (c) => c.methodName === workingMethodName
    )[0]?.id;

    return departmentId;
  }

  getPersonelUserCvId(cvName: string): number {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  clearInput1() {
    let value = this.addForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.addForm.get('cvName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.addForm.get('companyName');
    value.reset();
    this.getAdminValues();
  }

  clearInput4() {
    let value = this.addForm.get('companySectorName');
    value.reset();
    this.getSectors();
  }

  clearInput5() {
    let value = this.addForm.get('departmentName');
    value.reset();
    this.getAdminValues();
  }

  clearInput6() {
    let value = this.addForm.get('workingMethodName');
    value.reset();
  }

  clearInput7() {
    let value = this.addForm.get('countryName');
    value.reset();
  }

  clearInput8() {
    let value = this.addForm.get('cityName');
    value.reset();
  }

  clearInput9() {
    let value = this.addForm.get('regionName');
    value.reset();
  }

  clearInput10() {
    let value = this.addForm.get('startDate');
    value.reset();
  }

  clearInput11() {
    let value = this.addForm.get('endDate');
    value.reset();
  }
  clearInput12() {
    let value = this.addForm.get('position');
    value.reset();
  }

  clearInput13() {
    let value = this.addForm.get('detail');
    value.reset();
    this.detailText = '';
  }
}
