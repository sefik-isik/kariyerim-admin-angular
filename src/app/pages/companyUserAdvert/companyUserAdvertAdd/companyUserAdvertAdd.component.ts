import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvert } from '../../../models/component/companyUserAdvert';
import { Language } from '../../../models/component/language';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { Position } from '../../../models/component/position';
import { PositionLevel } from '../../../models/component/positionLevel';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { ExperienceService } from '../../../services/experience.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { LanguageService } from '../../../services/language.service';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { LicenseDegreeService } from '../../../services/licenseDegree.service';
import { PositionService } from '../../../services/position.service';
import { PositionLevelService } from '../../../services/positionLevel.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { WorkAreaService } from '../../../services/workArea.service';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { DriverLicence } from './../../../models/component/driverLicence';
import { Experience } from './../../../models/component/experience';
import { WorkArea } from './../../../models/component/workArea';
import { WorkingMethod } from './../../../models/component/workingMethod';
import { CompanyUserService } from './../../../services/companyUser.service';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { City } from '../../../models/component/city';
import { Region } from '../../../models/component/region';
import { Sector } from '../../../models/component/sector';
import { CityService } from '../../../services/city.service';
import { RegionService } from '../../../services/region.service';
import { SectorService } from '../../../services/sectorService';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/component/country';

@Component({
  selector: 'app-companyUserAdvertAdd',
  templateUrl: './companyUserAdvertAdd.component.html',
  styleUrls: ['./companyUserAdvertAdd.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertAddComponent implements OnInit {
  companyUserAdvertModel: CompanyUserAdvertDTO = {} as CompanyUserAdvertDTO;
  userDTOs: UserDTO[] = [];
  companyUsers: CompanyUserDTO[] = [];
  workAreas: WorkArea[] = [];
  workingMethods: WorkingMethod[] = [];
  experiences: Experience[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  licenseDegrees: LicenseDegree[] = [];
  driverLicences: DriverLicence[] = [];
  selectedImage: File | null = null;
  imagePath: string | null = null;
  imageName: string | null = null;
  imageOwnName: string | null = null;
  positions: Position[] = [];
  positionLevels: PositionLevel[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  countries: Country[];
  cities: City[] = [];
  regions: Region[] = [];
  sectors: Sector[] = [];
  admin: boolean = false;
  componentTitle = 'Company Advert Add Form';

  constructor(
    private companyUserAdvertService: CompanyUserAdvertService,
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private workAreaService: WorkAreaService,
    private workingMethodService: WorkingMethodService,
    private experienceService: ExperienceService,
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private lisenseDegreeService: LicenseDegreeService,
    private driverLicenceService: DriverLicenceService,
    private positionService: PositionService,
    private positionLevelService: PositionLevelService,
    private languageService: LanguageService,
    private languageLevelService: LanguageLevelService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getWorkingMethods();
    this.getWorkAreas();
    this.getExperiences();
    this.getExperiences();
    this.getLicenseDegrees();
    this.getPositions();
    this.getPositionLevels();
    this.getLanguages();
    this.getLanguageLevels();
    this.getDriverLicences();
    this.getCountries();
    this.getSectors();
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
        this.cities = response.data
          .filter((f) => f.cityName != '-')
          .filter((c) => c.countryId === this.getCountryId(countryName));
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.regions = response.data
          .filter((f) => f.regionName != '-')
          .filter((r) => r.cityId === this.getCityId(cityName));
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.sectors = response.data.filter((f) => f.sectorName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
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

  getSectorId(sectorName: string): string {
    const sectorId = this.sectors.filter((c) => c.sectorName === sectorName)[0]
      ?.id;
    return sectorId;
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  add(form: NgForm) {
    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    this.companyUserAdvertService.add(this.getModel()).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.activeModal.close();
        this.router.navigate([
          '/dashboard/companyuseradvert/companyuseradvertlisttab',
        ]);
      },
      (responseError) => {
        this.validationService.handleErrors(responseError);
      }
    );
  }

  getModel(): CompanyUserAdvert {
    return Object.assign({
      id: '',
      userId: this.getUserId(this.companyUserAdvertModel.email),
      companyUserId: this.getCompanyUserId(
        this.companyUserAdvertModel.companyUserName
      ),
      advertName: this.companyUserAdvertModel.advertName,
      workAreaId: this.getWorkAreaId(this.companyUserAdvertModel.workAreaName),
      workingMethodId: this.getWorkingMethodId(
        this.companyUserAdvertModel.workingMethodName
      ),
      departmentId: this.getCompanyUserDepartmentId(
        this.companyUserAdvertModel.departmentName
      ),
      positionId: this.getPositionId(this.companyUserAdvertModel.positionName),
      positionLevelId: this.getPositionLevelId(
        this.companyUserAdvertModel.positionLevelName
      ),

      experienceId: this.getExperienceId(
        this.companyUserAdvertModel.experienceName
      ),
      licenseDegreeId: this.getLicenseDegreeId(
        this.companyUserAdvertModel.licenseDegreeName
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.companyUserAdvertModel.driverLicenceName
      ),
      languageId: this.getLanguageId(this.companyUserAdvertModel.languageName),
      languageLevelId: this.getLanguageLevelId(
        this.companyUserAdvertModel.languageLevelName
      ),
      countryId: this.getCountryId(this.companyUserAdvertModel.countryName),
      cityId: this.getCityId(this.companyUserAdvertModel.cityName),
      regionId: this.getRegionId(this.companyUserAdvertModel.regionName),
      sectorId: this.getSectorId(this.companyUserAdvertModel.sectorName),
      militaryStatus: this.companyUserAdvertModel.militaryStatus,
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
        this.getCompanyUserDepartments();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        if (this.admin) {
          this.userDTOs = response.data;
        } else {
          this.companyUserAdvertModel.email = adminModel.email;
          this.companyUserAdvertModel.userId = adminModel.id;
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);

        this.companyUsers = response.data.filter(
          (f) => f.email == this.companyUserAdvertModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  setCompanyUserMail(email: string) {
    this.companyUserAdvertModel.email = email;

    this.getAdminValues();
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

  getWorkAreas() {
    this.workAreaService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.workAreas = response.data.filter((f) => f.areaName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getCompanyUserDepartments() {
    this.companyUserDepartmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDepartments = response.data;
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
  getExperiences() {
    this.experienceService.getAll().subscribe(
      (response) => {
        this.companyUserAdvertModel.experienceId = response.data.filter(
          (f) => f.experienceName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.experiences = response.data.filter((f) => f.experienceName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getLicenseDegrees() {
    this.lisenseDegreeService.getAll().subscribe(
      (response) => {
        this.companyUserAdvertModel.licenseDegreeId = response.data.filter(
          (f) => f.licenseDegreeName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.licenseDegrees = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.companyUserAdvertModel.driverLicenceId = response.data.filter(
          (f) => f.driverLicenceName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.driverLicences = response.data.filter(
          (f) => f.driverLicenceName != '-'
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.companyUserAdvertModel.languageId = response.data.filter(
          (f) => f.languageName == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.languages = response.data.filter((f) => f.languageName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.companyUserAdvertModel.languageLevelId = response.data.filter(
          (f) => f.levelTitle == '-'
        )[0]?.id;

        this.validationService.handleSuccesses(response);
        this.languageLevels = response.data.filter((f) => f.levelTitle != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserId(companyUserName: string): string {
    const companyUserId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  getUserId(email: string): string {
    const userId = this.userDTOs.filter((u) => u.email === email)[0]?.id;

    return userId;
  }

  getWorkAreaId(workAreaName: string): string {
    const workAreaId = this.workAreas.filter(
      (w) => w.areaName === workAreaName
    )[0]?.id;

    return workAreaId;
  }
  getWorkingMethodId(workingMethodName: string): string {
    const workingMethodId = this.workingMethods.filter(
      (w) => w.methodName === workingMethodName
    )[0]?.id;

    return workingMethodId;
  }

  getCompanyUserDepartmentId(departmentName: string): string {
    const departmentId = this.companyUserDepartments.filter(
      (d) => d.departmentName === departmentName
    )[0]?.id;

    return departmentId;
  }

  getPositionId(positionName: string): string {
    const positionNameId = this.positions.filter(
      (l) => l.positionName === positionName
    )[0]?.id;

    return positionNameId;
  }

  getPositionLevelId(positionLevelName: string): string {
    const positionLevelNameId = this.positionLevels.filter(
      (l) => l.positionLevelName === positionLevelName
    )[0]?.id;

    return positionLevelNameId;
  }

  getExperienceId(experienceName: string): string {
    let experienceId: string;

    experienceName == null || experienceName == '' || experienceName == '-'
      ? (experienceId = this.companyUserAdvertModel.experienceId)
      : (experienceId = this.experiences.filter(
          (c) => c.experienceName === experienceName
        )[0]?.id);
    return experienceId;
  }

  getLicenseDegreeId(licenseDegreeName: string): string {
    let licenseDegreeId: string;

    licenseDegreeName == null ||
    licenseDegreeName == '' ||
    licenseDegreeName == '-'
      ? (licenseDegreeId = this.companyUserAdvertModel.licenseDegreeId)
      : (licenseDegreeId = this.licenseDegrees.filter(
          (c) => c.licenseDegreeName === licenseDegreeName
        )[0]?.id);

    return licenseDegreeId;
  }

  getDriverLicenceId(driverLicenceName: string): string {
    let driverLicenceId: string;

    driverLicenceName == null ||
    driverLicenceName == '' ||
    driverLicenceName == '-'
      ? (driverLicenceId = this.companyUserAdvertModel.driverLicenceId)
      : (driverLicenceId = this.driverLicences.filter(
          (c) => c.driverLicenceName === driverLicenceName
        )[0]?.id);

    return driverLicenceId;
  }

  getLanguageId(languageName: string): string {
    let languageId: string;

    languageName == null || languageName == '' || languageName == '-'
      ? (languageId = this.companyUserAdvertModel.languageId)
      : (languageId = this.languages.filter(
          (c) => c.languageName === languageName
        )[0]?.id);

    return languageId;
  }

  getLanguageLevelId(languageLevelitle: string): string {
    let languageLevelId: string;

    languageLevelitle == null ||
    languageLevelitle == '' ||
    languageLevelitle == '-'
      ? (languageLevelId = this.companyUserAdvertModel.languageLevelId)
      : (languageLevelId = this.languageLevels.filter(
          (c) => c.levelTitle === languageLevelitle
        )[0]?.id);

    return languageLevelId;
  }

  emailClear() {
    this.companyUserAdvertModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserAdvertModel.companyUserName = '';
  }

  advertNameClear() {
    this.companyUserAdvertModel.advertName = '';
  }

  workAreaNameClear() {
    this.companyUserAdvertModel.workAreaName = '';
  }

  workingMethodNameClear() {
    this.companyUserAdvertModel.workingMethodName = '';
  }

  experienceNameClear() {
    this.companyUserAdvertModel.experienceName = '';
  }

  departmentNameClear() {
    this.companyUserAdvertModel.departmentName = '';
  }

  licenseDegreeNameClear() {
    this.companyUserAdvertModel.licenseDegreeName = '';
  }

  positionNameClear() {
    this.companyUserAdvertModel.positionName = '';
  }

  positionLevelNameClear() {
    this.companyUserAdvertModel.positionLevelName = '';
  }

  languageNameClear() {
    this.companyUserAdvertModel.languageName = '';
  }

  languageLevelNameClear() {
    this.companyUserAdvertModel.languageLevelName = '';
  }

  driverLicenceNameClear() {
    this.companyUserAdvertModel.driverLicenceName = '';
  }

  countryNameClear() {
    this.companyUserAdvertModel.countryName = '';
  }

  cityNameClear() {
    this.companyUserAdvertModel.cityName = '';
  }

  regionNameClear() {
    this.companyUserAdvertModel.regionName = '';
  }

  sectorNameClear() {
    this.companyUserAdvertModel.sectorName = '';
  }
}
