import { WorkingMethodService } from './../../../services/workingMethod.service';
import { SectorService } from './../../../services/sectorService';
import { CompanyUserDepartmentService } from './../../../services/companyUserDepartment.service';
import { PersonelUserCvService } from './../../../services/personelUserCv.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { Country } from '../../../models/component/country';
import { City } from '../../../models/component/city';
import { Region } from '../../../models/component/region';
import { CountryService } from '../../../services/country.service';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { Sector } from '../../../models/component/sector';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvWorkExperienceAdd',
  templateUrl: './personelUserCvWorkExperienceAdd.component.html',
  styleUrls: ['./personelUserCvWorkExperienceAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvWorkExperienceAddComponent implements OnInit {
  personelUserCvWorkExperienceModel: PersonelUserCvWorkExperienceDTO =
    {} as PersonelUserCvWorkExperienceDTO;
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  detailCount: number;
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  today: number = Date.now();
  componentTitle = 'Personel User Cv Work Experience Add Form';

  constructor(
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
    private workingMethodService: WorkingMethodService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.getSectors();
    this.getCountries();
    this.getWorkingMethods();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvWorkExperienceService.add(this.getModel()).subscribe(
        (response) => {
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercvworkexperience/personelusercvworkexperiencelisttab',
          ]);
        },
        (responseError) => {
          console.error;
        }
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel(): PersonelUserCvWorkExperienceDTO {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.personelUserCvWorkExperienceModel.email),
      personelUserId: this.getPersonelUserId(
        this.personelUserCvWorkExperienceModel.email
      ),
      cvId: this.getPersonelUserCvId(
        this.personelUserCvWorkExperienceModel.cvName
      ),
      companySectorId: this.CompanySectorId(
        this.personelUserCvWorkExperienceModel.companySectorName
      ),
      departmentId: this.getDepartmentId(
        this.personelUserCvWorkExperienceModel.departmentName
      ),
      foundJobInHere: this.personelUserCvWorkExperienceModel.foundJobInHere,
      working: this.personelUserCvWorkExperienceModel.working,
      position: this.personelUserCvWorkExperienceModel.position,
      companyName: this.personelUserCvWorkExperienceModel.companyName,
      workingMethodId: this.getWorkingMethodId(
        this.personelUserCvWorkExperienceModel.workingMethodName
      ),
      countryId: this.getCountryId(
        this.personelUserCvWorkExperienceModel.countryName
      ),
      cityId: this.getCityId(this.personelUserCvWorkExperienceModel.cityName),
      regionId: this.getRegionId(
        this.personelUserCvWorkExperienceModel.regionName
      ),
      startDate: new Date(
        this.personelUserCvWorkExperienceModel.startDate
      ).toJSON(),
      endDate: new Date(
        this.personelUserCvWorkExperienceModel.endDate
      ).toJSON(),
      detail: this.personelUserCvWorkExperienceModel.detail,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
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
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    return cityId;
  }

  getRegionId(regionName: string): string {
    const regionId = this.regions.filter((c) => c.regionName === regionName)[0]
      ?.id;

    return regionId;
  }

  count() {
    this.detailCount = this.personelUserCvWorkExperienceModel.detail.length;
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

  emailClear() {
    this.personelUserCvWorkExperienceModel.email = '';
  }

  cvNameClear() {
    this.personelUserCvWorkExperienceModel.cvName = '';
  }

  companyNameClear() {
    this.personelUserCvWorkExperienceModel.companyName = '';
  }

  companySectorNameClear() {
    this.personelUserCvWorkExperienceModel.companySectorName = '';
  }

  departmentNameClear() {
    this.personelUserCvWorkExperienceModel.departmentName = '';
  }

  workingMethodNameClear() {
    this.personelUserCvWorkExperienceModel.workingMethodName = '';
  }

  countryNameClear() {
    this.personelUserCvWorkExperienceModel.countryName = '';
  }

  cityNameClear() {
    this.personelUserCvWorkExperienceModel.cityName = '';
  }

  regionNameClear() {
    this.personelUserCvWorkExperienceModel.regionName = '';
  }

  startDateClear() {
    this.personelUserCvWorkExperienceModel.startDate = '';
  }

  endDateClear() {
    this.personelUserCvWorkExperienceModel.endDate = '';
  }

  positionClear() {
    this.personelUserCvWorkExperienceModel.position = '';
  }

  detailClear() {
    this.personelUserCvWorkExperienceModel.detail = '';
  }
}
