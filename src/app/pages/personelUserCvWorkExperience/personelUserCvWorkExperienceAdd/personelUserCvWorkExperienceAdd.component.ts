import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { Country } from '../../../models/component/country';
import { Department } from '../../../models/component/department';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { Position } from '../../../models/component/position';
import { PositionLevel } from '../../../models/component/positionLevel';
import { Region } from '../../../models/component/region';
import { Sector } from '../../../models/component/sector';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { PositionService } from '../../../services/position.service';
import { PositionLevelService } from '../../../services/positionLevel.service';
import { RegionService } from '../../../services/region.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserCvService } from './../../../services/personelUserCv.service';
import { SectorService } from './../../../services/sectorService';
import { WorkingMethodService } from './../../../services/workingMethod.service';
import { AuthService } from '../../../services/auth.service';

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
  departments: Department[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  detailCount: number;
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  positions: Position[] = [];
  positionLevels: PositionLevel[] = [];
  today: number = Date.now();
  admin: boolean = false;
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
    private positionService: PositionService,
    private positionLevelService: PositionLevelService,
    private departmentService: DepartmentService,
    private sectorService: SectorService,
    private workingMethodService: WorkingMethodService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getSectors();
    this.getPositions();
    this.getPositionLevels();
    this.getCountries();
    this.getCities('');
    this.getRegions('');
    this.getWorkingMethods();
    this.getDepartments();
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.personelUserCvWorkExperienceService.add(this.getModel()).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.activeModal.close();
          this.toastrService.success(response.message, 'Başarılı');
          this.router.navigate([
            '/dashboard/personelusercvworkexperience/personelusercvworkexperiencelisttab',
          ]);
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
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
      companyName: this.personelUserCvWorkExperienceModel.companyName,
      positionId: this.getPositionId(
        this.personelUserCvWorkExperienceModel.positionName
      ),
      positionLevelId: this.getPositionLevelId(
        this.personelUserCvWorkExperienceModel.positionLevelName
      ),
      working: this.personelUserCvWorkExperienceModel.working,
      startDate: new Date(
        this.personelUserCvWorkExperienceModel.startDate
      ).toJSON(),
      endDate: new Date(
        this.setNullDateValue(this.personelUserCvWorkExperienceModel.endDate)
      ).toJSON(),

      companySectorId: this.getCompanySectorId(
        this.personelUserCvWorkExperienceModel.companySectorName
      ),
      departmentId: this.getDepartmentId(
        this.personelUserCvWorkExperienceModel.departmentName
      ),
      foundJobInHere: this.personelUserCvWorkExperienceModel.foundJobInHere,

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

      detail: this.setNullValue(this.personelUserCvWorkExperienceModel.detail),
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
        this.getPersonelUsers(response);
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
          this.personelUserCvWorkExperienceModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.personelUserCvWorkExperienceModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companySectors = response.data.filter((f) => f.sectorName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPositions() {
    this.positionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.positions = response.data.filter((f) => f.positionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPositionLevels() {
    this.positionLevelService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.positionLevels = response.data.filter(
          (f) => f.positionLevelName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getWorkingMethods() {
    this.workingMethodService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.workingMethods = response.data.filter((f) => f.methodName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.departments = response.data
          .filter((f) => f.isCompany === true)
          .filter((f) => f.departmentName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.countries = response.data.filter((f) => f.countryName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCities(countryName: string) {
    this.cityService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (countryName == '-' || countryName == '') {
          this.cities = response.data;
        } else {
          this.cities = response.data.filter(
            (c) => c.countryId === this.getCountryId(countryName)
          );
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (cityName == '-' || cityName == '') {
          this.regions = response.data.filter((f) => f.regionName != '-');
        } else {
          this.regions = response.data
            .filter((r) => r.cityId === this.getCityId(cityName))
            .filter((f) => f.regionName != '-');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getCompanySectorId(companySectorName: string) {
    if (companySectorName == null || companySectorName == '') {
      companySectorName = '-';
    }
    const companySectorId = this.companySectors.filter(
      (c) => c.sectorName === companySectorName
    )[0]?.id;

    return companySectorId;
  }

  getCountryId(countryName: string): string {
    if (countryName == null || countryName == '') {
      countryName = '-';
    }
    const countryId = this.countries.filter(
      (c) => c.countryName === countryName
    )[0]?.id;

    return countryId;
  }

  getCityId(cityName: string): string {
    if (cityName == null || cityName == '') {
      cityName = '-';
    }
    const cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id;

    return cityId;
  }

  getRegionId(regionName: string): string {
    if (regionName == null || regionName == '') {
      regionName = '-';
    }
    const regionId = this.regions.filter((c) => c.regionName === regionName)[0]
      ?.id;

    return regionId;
  }

  getPositionId(positionName: string): string {
    const positionId = this.positions.filter(
      (c) => c.positionName === positionName
    )[0]?.id;

    return positionId;
  }

  count() {
    this.detailCount = this.personelUserCvWorkExperienceModel.detail.length;
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getDepartmentId(departmentName: string): string {
    if (departmentName == null || departmentName == '') {
      departmentName = '-';
    }
    const departmentId = this.departments.filter(
      (c) => c.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  getWorkingMethodId(workingMethodName: string): string {
    if (workingMethodName == null || workingMethodName == '') {
      workingMethodName = '-';
    }
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

  getPositionLevelId(positionLevelName: string): string {
    const positionLevelId = this.positionLevels.filter(
      (c) => c.positionLevelName === positionLevelName
    )[0]?.id;

    return positionLevelId;
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
    this.personelUserCvWorkExperienceModel.positionName = '';
  }

  positionLevelNameClear() {
    this.personelUserCvWorkExperienceModel.positionLevelName = '';
  }

  detailClear() {
    this.personelUserCvWorkExperienceModel.detail = '';
  }
}
