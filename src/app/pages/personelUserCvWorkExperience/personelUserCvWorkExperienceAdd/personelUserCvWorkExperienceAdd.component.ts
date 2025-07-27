import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { Country } from '../../../models/component/country';
import { PersonelUserCv } from '../../../models/component/personelUserCv';
import { Position } from '../../../models/component/position';
import { PositionLevel } from '../../../models/component/positionLevel';
import { Region } from '../../../models/component/region';
import { Sector } from '../../../models/component/sector';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
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
import { PersonelUser } from '../../../models/component/personelUser';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-personelUserCvWorkExperienceAdd',
  templateUrl: './personelUserCvWorkExperienceAdd.component.html',
  styleUrls: ['./personelUserCvWorkExperienceAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class PersonelUserCvWorkExperienceAddComponent implements OnInit {
  personelUserCvWorkExperienceModel: PersonelUserCvWorkExperienceDTO =
    {} as PersonelUserCvWorkExperienceDTO;
  userDTOs: UserDTO[] = [];
  personelUsers: PersonelUser[] = [];
  personelUserCvs: PersonelUserCv[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  editorCount: number = 0;
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  positions: Position[] = [];
  positionLevels: PositionLevel[] = [];
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Cv Work Experience Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

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
    private companyUserDepartmentService: CompanyUserDepartmentService,
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
    this.getCities();
    this.getRegions();
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

      detail: this.setNullValue(this.htmlContent),
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
        this.getPersonelUserCvs(response);
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
          this.personelUserCvWorkExperienceModel.email = adminModel.email;
          this.personelUserCvWorkExperienceModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUsers = response.data;
        this.getPersonelUserCvs(adminModel);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvs = response.data.filter(
          (f) => f.email == this.personelUserCvWorkExperienceModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setPersonelUserCv(email: string) {
    this.personelUserCvWorkExperienceModel.email = email;

    this.getAdminValues();
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.personelUserCvWorkExperienceModel.companySectorId =
          response.data.filter((f) => f.sectorName == '-')[0]?.id;

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
        this.personelUserCvWorkExperienceModel.workingMethodId =
          response.data.filter((f) => f.methodName == '-')[0]?.id;

        this.validationService.handleSuccesses(response);
        this.workingMethods = response.data.filter((f) => f.methodName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getDepartments() {
    this.companyUserDepartmentService.getAll().subscribe(
      (response) => {
        this.personelUserCvWorkExperienceModel.departmentId =
          response.data.filter((f) => f.departmentName == '-')[0]?.id;

        this.validationService.handleSuccesses(response);
        this.companyUserDepartments = response.data.filter(
          (f) => f.departmentName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCountries() {
    this.countryService.getAll().subscribe(
      (response) => {
        this.personelUserCvWorkExperienceModel.countryId = response.data.filter(
          (f) => f.countryName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.countries = response.data.filter((f) => f.countryName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setCountryName(countryName: string) {
    this.personelUserCvWorkExperienceModel.countryName = countryName;

    this.getCities();
  }

  getCities() {
    this.cityService.getAll().subscribe(
      (response) => {
        this.personelUserCvWorkExperienceModel.cityId = response.data.filter(
          (f) => f.cityName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.cities = response.data.filter(
          (c) =>
            c.countryId ===
            this.getCountryId(
              this.personelUserCvWorkExperienceModel.countryName
            )
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setCityName(cityName: string) {
    this.personelUserCvWorkExperienceModel.cityName = cityName;

    this.getRegions();
  }

  getRegions() {
    this.regionService.getAll().subscribe(
      (response) => {
        this.personelUserCvWorkExperienceModel.regionId = response.data.filter(
          (f) => f.regionName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.regions = response.data
          .filter(
            (r) =>
              r.cityId ===
              this.getCityId(this.personelUserCvWorkExperienceModel.cityName)
          )
          .filter((f) => f.regionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUsers.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getDepartmentId(departmentName: string): string {
    let departmentId: string;

    departmentName == null || departmentName == '' || departmentName == '-'
      ? (departmentId = this.personelUserCvWorkExperienceModel.departmentId)
      : (departmentId = this.companyUserDepartments.filter(
          (c) => c.departmentName === departmentName
        )[0]?.id);

    return departmentId;
  }

  getWorkingMethodId(workingMethodName: string): string {
    let workingMethodtId: string;

    workingMethodName == null ||
    workingMethodName == '' ||
    workingMethodName == '-'
      ? (workingMethodtId =
          this.personelUserCvWorkExperienceModel.workingMethodId)
      : (workingMethodtId = this.workingMethods.filter(
          (c) => c.methodName === workingMethodName
        )[0]?.id);

    return workingMethodtId;
  }

  getPersonelUserCvId(cvName: string): string {
    const personelUserId = this.personelUserCvs.filter(
      (c) => c.cvName === cvName
    )[0]?.id;

    return personelUserId;
  }
  getPositionId(positionName: string): string {
    const positionId = this.positions.filter(
      (c) => c.positionName === positionName
    )[0]?.id;

    return positionId;
  }
  getPositionLevelId(positionLevelName: string): string {
    const positionLevelId = this.positionLevels.filter(
      (c) => c.positionLevelName === positionLevelName
    )[0]?.id;

    return positionLevelId;
  }

  getCompanySectorId(companySectorName: string) {
    let companySectorId: string;

    companySectorName == null ||
    companySectorName == '' ||
    companySectorName == '-'
      ? (companySectorId =
          this.personelUserCvWorkExperienceModel.companySectorId)
      : (companySectorId = this.companySectors.filter(
          (c) => c.sectorName === companySectorName
        )[0]?.id);

    return companySectorId;
  }

  getCountryId(countryName: string): string {
    let countryId: string;

    countryName == null || countryName == '' || countryName == '-'
      ? (countryId = this.personelUserCvWorkExperienceModel.countryId)
      : (countryId = this.countries.filter(
          (c) => c.countryName === countryName
        )[0]?.id);

    return countryId;
  }

  getCityId(cityName: string): string {
    let cityId: string;

    cityName == null || cityName == '' || cityName == '-'
      ? (cityId = this.personelUserCvWorkExperienceModel.cityId)
      : (cityId = this.cities.filter((c) => c.cityName === cityName)[0]?.id);

    return cityId;
  }

  getRegionId(regionName: string): string {
    let regionId: string;

    regionName == null || regionName == '' || regionName == '-'
      ? (regionId = this.personelUserCvWorkExperienceModel.regionId)
      : (regionId = this.regions.filter((c) => c.regionName === regionName)[0]
          ?.id);

    return regionId;
  }

  count() {
    this.editorCount = this.htmlContent.length;
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
