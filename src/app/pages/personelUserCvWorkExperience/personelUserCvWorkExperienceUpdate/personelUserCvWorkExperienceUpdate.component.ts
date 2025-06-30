import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { Component, Input, OnInit } from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { UserService } from '../../../services/user.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { Sector } from '../../../models/component/sector';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { Country } from '../../../models/component/country';
import { City } from '../../../models/component/city';
import { Region } from '../../../models/component/region';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { CountryService } from '../../../services/country.service';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { SectorService } from '../../../services/sectorService';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvWorkExperienceUpdate',
  templateUrl: './personelUserCvWorkExperienceUpdate.component.html',
  styleUrls: ['./personelUserCvWorkExperienceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvWorkExperienceUpdateComponent implements OnInit {
  @Input() personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO;
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  detailCount: number;
  today: number = Date.now();
  componentTitle = 'Personel User Cv Work Experience Update Form';

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
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.getSectors();
    this.getCountries();
    this.getWorkingMethods();

    setTimeout(() => {
      this.getUserValues(this.personelUserCvWorkExperienceDTO.id);
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
    this.personelUserCvWorkExperienceService.getById(adminModel).subscribe(
      (response) => {
        this.personelUserCvWorkExperienceDTO.id = response.data.id;
      },
      (responseError) => console.error
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvWorkExperienceService
        .update(this.getModel())
        .subscribe(
          (response) => {
            this.activeModal.close();
            this.toastrService.success(response.message, 'Başarılı');
            this.router.navigate([
              '/dashboard/personelusercvworkexperience/personelusercvworkexperiencelisttab',
            ]);
          },
          (responseError) => {
            console.log(responseError);
          }
        );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvWorkExperienceDTO {
    return Object.assign({
      id: this.personelUserCvWorkExperienceDTO.id,
      userId: this.getUserId(this.personelUserCvWorkExperienceDTO.email),
      personelUserId: this.getPersonelUserId(
        this.personelUserCvWorkExperienceDTO.email
      ),
      cvId: this.getPersonelUserCvId(
        this.personelUserCvWorkExperienceDTO.cvName
      ),
      companySectorId: this.CompanySectorId(
        this.personelUserCvWorkExperienceDTO.companySectorName
      ),
      departmentId: this.getDepartmentId(
        this.personelUserCvWorkExperienceDTO.departmentName
      ),
      foundJobInHere: this.personelUserCvWorkExperienceDTO.foundJobInHere,
      working: this.personelUserCvWorkExperienceDTO.working,
      position: this.personelUserCvWorkExperienceDTO.position,
      companyName: this.personelUserCvWorkExperienceDTO.companyName,
      workingMethodId: this.getWorkingMethodId(
        this.personelUserCvWorkExperienceDTO.workingMethodName
      ),
      countryId: this.getCountryId(
        this.personelUserCvWorkExperienceDTO.countryName
      ),
      cityId: this.getCityId(this.personelUserCvWorkExperienceDTO.cityName),
      regionId: this.getRegionId(
        this.personelUserCvWorkExperienceDTO.regionName
      ),
      startDate: new Date(
        this.personelUserCvWorkExperienceDTO.startDate
      ).toJSON(),
      endDate: new Date(this.personelUserCvWorkExperienceDTO.endDate).toJSON(),
      detail: this.personelUserCvWorkExperienceDTO.detail,
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
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
        this.getCompanyUserDepartments(response);
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

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (responseError) => console.error
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvs = response.data;
      },
      (responseError) => console.error
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.companySectors = response.data;
      },
      (responseError) => console.error
    );
  }

  getWorkingMethods() {
    this.workingMethodService.getAll().subscribe(
      (response) => {
        this.workingMethods = response.data;
      },
      (responseError) => console.error
    );
  }

  getCompanyUserDepartments(adminModel: AdminModel) {
    this.companyUserDepartmentService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDepartments = response.data;
      },
      (responseError) => console.error
    );
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.countries = response.data;
      },
      (responseError) => console.error
    );
  }

  getCities(countryName: string) {
    this.cityService.getAll().subscribe(
      (response) => {
        this.cities = response.data.filter(
          (c) => c.countryId === this.getCountryId(countryName)
        );
      },
      (responseError) => console.error
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        this.regions = response.data.filter(
          (r) => r.cityId === this.getCityId(cityName)
        );
      },
      (responseError) => console.error
    );
  }

  getUserEmailById(personelUserId: string) {
    const userEmail = this.userDTOs.filter((c) => c.id === personelUserId)[0]
      ?.email;

    return userEmail;
  }

  getCvNameById(cvId: string) {
    const cvName = this.personelUserCvs.filter((c) => c.id === cvId)[0]?.cvName;

    return cvName;
  }
  getCompanySectorNameById(companySectorId: string): any {
    const companySectorName = this.companySectors.filter(
      (c) => c.id === companySectorId
    )[0]?.sectorName;
    return companySectorName;
  }

  getPersonelUserId(email: string): string {
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

  getCountryId(countryName: string): string {
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  getCityId(cityName: string): string {
    let cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    if (cityId == undefined) {
      cityId = this.personelUserCvWorkExperienceDTO.cityId;
    }
    return cityId;
  }

  getRegionId(regionName: string): string {
    let regionId = this.regions.filter((c) => c.regionName === regionName)[0]
      ?.id;

    if (regionId == undefined) {
      regionId = this.personelUserCvWorkExperienceDTO.regionId;
    }

    return regionId;
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getDepartmentId(departmentName: string): string {
    const departmentId = this.companyUserDepartments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  getWorkingMethodId(workingMethodName: string): string {
    const departmentId = this.workingMethods.filter(
      (c) => c.methodName === workingMethodName
    )[0]?.id;

    return departmentId;
  }

  getPersonelUserCvId(cvName: string): string {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }

  companyNameClear() {
    this.personelUserCvWorkExperienceDTO.companyName = '';
  }

  companySectorNameClear() {
    this.personelUserCvWorkExperienceDTO.companySectorName = '';
  }

  departmentNameClear() {
    this.personelUserCvWorkExperienceDTO.departmentName = '';
  }

  workingMethodNameClear() {
    this.personelUserCvWorkExperienceDTO.workingMethodName = '';
  }

  countryNameClear() {
    this.personelUserCvWorkExperienceDTO.countryName = '';
  }

  cityNameClear() {
    this.personelUserCvWorkExperienceDTO.cityName = '';
  }

  regionNameClear() {
    this.personelUserCvWorkExperienceDTO.regionName = '';
  }

  startDateClear() {
    this.personelUserCvWorkExperienceDTO.startDate = '';
  }

  endDateClear() {
    this.personelUserCvWorkExperienceDTO.endDate = '';
  }

  positionClear() {
    this.personelUserCvWorkExperienceDTO.position = '';
  }

  detailClear() {
    this.personelUserCvWorkExperienceDTO.detail = '';
  }
}
