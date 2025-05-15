import { PersonelUserCvWorkExperienceDTO } from './../../../models/personelUserCvWorkExperienceDTO';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminModel } from '../../../models/adminModel';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCv } from '../../../models/personelUserCv';
import { UserService } from '../../../services/user.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AdminService } from '../../../services/admin.service';
import { CompanyUserDepartment } from '../../../models/companyUserDepartment';
import { Sector } from '../../../models/sector';
import { WorkingMethod } from '../../../models/workingMethod';
import { Country } from '../../../models/country';
import { City } from '../../../models/city';
import { Region } from '../../../models/region';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { CountryService } from '../../../services/country.service';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { SectorService } from '../../../services/sectorService';
import { WorkingMethodService } from '../../../services/workingMethod.service';

@Component({
  selector: 'app-personelUserCvWorkExperienceUpdate',
  templateUrl: './personelUserCvWorkExperienceUpdate.component.html',
  styleUrls: ['./personelUserCvWorkExperienceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonelUserCvWorkExperienceUpdateComponent implements OnInit {
  updateForm: FormGroup;
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  detailText: string;
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  componentTitle = 'Personel User Cv Work Experience Update Form';
  personelUserId: number;
  id: number;
  userDTOs: UserDTO[] = [];
  userEmail: string;
  detailCount: number;

  constructor(
    private personelUserCvWorkExperienceService: PersonelUserCvWorkExperienceService,
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private personelUserCvService: PersonelUserCvService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private sectorService: SectorService,
    private workingMethodService: WorkingMethodService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getAdminValues();
    this.getSectors();
    this.getCountries();
    this.getCities();
    this.getRegions();
    this.getWorkingMethods();

    setTimeout(() => {
      this.activatedRoute.params.subscribe((params) => {
        this.getUserValues(params['personelusercvworkexperienceId']);
      });
    }, 500);
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
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
    this.personelUserCvWorkExperienceService.getById(adminModel).subscribe(
      (response) => {
        this.id = response.data.id;
        this.personelUserId = response.data.personelUserId;
        this.userEmail = this.getUserEmailById(this.personelUserId);
        this.detailCount = this.count(response.data.detail);

        this.updateForm.patchValue({
          cvName: this.getCvNameById(response.data.cvId),
          position: response.data.position,
          companyName: response.data.companyName,
          companySectorName: this.getCompanySectorNameById(
            response.data.companySectorId
          ),
          workingMethodName: this.getWorkingMethodNameById(
            response.data.workingMethodId
          ),
          countryName: this.getCountryNameById(response.data.countryId),
          cityName: this.getCityNameById(response.data.cityId),
          regionName: this.getRegionNameById(response.data.regionId),
          departmentName: this.getDepartmentNameById(
            response.data.departmentId
          ),
          startDate: this.formatDate(response.data.startDate),
          endDate: this.formatDate(response.data.endDate),
          foundJobInHere: response.data.foundJobInHere,
          working: response.data.working,
          detail: response.data.detail,
        });
      },
      (error) => console.error
    );
  }

  update() {
    if (
      this.updateForm.valid &&
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
      this.personelUserCvWorkExperienceService
        .update(this.getModel())
        .subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            this.router.navigate(['/dashboard/personelusercvworkexperiences']);
          },
          (error) => {
            this.toastrService.error(error.error.message);
          }
        );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvWorkExperienceDTO {
    return Object.assign({
      id: this.id,
      userId: this.getUserId(this.userEmail),
      personelUserId: this.getPersonelUserId(this.userEmail),
      cvId: this.getPersonelUserCvId(this.updateForm.value.cvName),
      companySectorId: this.CompanySectorId(
        this.updateForm.value.companySectorName
      ),
      departmentId: this.getDepartmentId(this.updateForm.value.departmentName),
      foundJobInHere: this.updateForm.value.foundJobInHere,
      working: this.updateForm.value.working,
      position: this.updateForm.value.position,
      companyName: this.updateForm.value.companyName,
      workingMethodId: this.getWorkingMethodId(
        this.updateForm.value.workingMethodName
      ),
      countryId: this.getCountryId(this.updateForm.value.countryName),
      cityId: this.getCityId(this.updateForm.value.cityName),
      regionId: this.getRegionId(this.updateForm.value.regionName),
      startDate: new Date(this.updateForm.value.startDate).toJSON(),
      endDate: new Date(this.updateForm.value.endDate).toJSON(),
      detail: this.updateForm.value.detail,
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
  }

  count(text: string): number {
    return text.length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
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
        this.personelUserCvs = response.data;
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
        this.cities = response.data;
      },
      (error) => console.error
    );
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        this.regions = response.data;
      },
      (error) => console.error
    );
  }

  getUserEmailById(personelUserId: number) {
    const userEmail = this.userDTOs.filter((c) => c.id === personelUserId)[0]
      ?.email;

    return userEmail;
  }

  getCvNameById(cvId: number) {
    const cvName = this.personelUserCvs.filter((c) => c.id === cvId)[0]?.cvName;

    return cvName;
  }
  getCompanySectorNameById(companySectorId: number): any {
    const companySectorName = this.companySectors.filter(
      (c) => c.id === companySectorId
    )[0]?.sectorName;
    return companySectorName;
  }

  getCountryNameById(countryId: number): string {
    const countryName = this.countries.filter((c) => c.id === countryId)[0]
      ?.countryName;
    return countryName;
  }

  getCityNameById(cityId: number): string {
    const cityName = this.cities.filter((c) => c.id === cityId)[0]?.cityName;
    return cityName;
  }
  getRegionNameById(regionId: number): string {
    const regionName = this.regions.filter((c) => c.id === regionId)[0]
      ?.regionName;
    return regionName;
  }
  getDepartmentNameById(departmentId: number): string {
    const departmentName = this.companyUserDepartments.filter(
      (c) => c.id === departmentId
    )[0]?.departmentName;
    return departmentName;
  }

  getWorkingMethodNameById(workingMethodId: number): string {
    const workingMethodName = this.workingMethods.filter(
      (c) => c.id === workingMethodId
    )[0]?.methodName;
    return workingMethodName;
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
    let value = this.updateForm.get('userEmail');
    value.reset();
    this.getAdminValues();
  }

  clearInput2() {
    let value = this.updateForm.get('cvName');
    value.reset();
    this.getAdminValues();
  }

  clearInput3() {
    let value = this.updateForm.get('companyName');
    value.reset();
    this.getAdminValues();
  }

  clearInput4() {
    let value = this.updateForm.get('companySectorName');
    value.reset();
    this.getSectors();
  }

  clearInput5() {
    let value = this.updateForm.get('departmentName');
    value.reset();
    this.getAdminValues();
  }

  clearInput6() {
    let value = this.updateForm.get('workingMethodName');
    value.reset();
  }

  clearInput7() {
    let value = this.updateForm.get('countryName');
    value.reset();
  }

  clearInput8() {
    let value = this.updateForm.get('cityName');
    value.reset();
  }

  clearInput9() {
    let value = this.updateForm.get('regionName');
    value.reset();
  }

  clearInput10() {
    let value = this.updateForm.get('startDate');
    value.reset();
  }

  clearInput11() {
    let value = this.updateForm.get('endDate');
    value.reset();
  }
  clearInput12() {
    let value = this.updateForm.get('position');
    value.reset();
  }

  clearInput13() {
    let value = this.updateForm.get('detail');
    value.reset();
    this.detailText = '';
  }
}
