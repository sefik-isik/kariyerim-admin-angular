import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { Country } from '../../../models/component/country';
import { Department } from '../../../models/component/department';
import { Position } from '../../../models/component/position';
import { PositionLevel } from '../../../models/component/positionLevel';
import { Region } from '../../../models/component/region';
import { Sector } from '../../../models/component/sector';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { CityService } from '../../../services/city.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { PositionService } from '../../../services/position.service';
import { PositionLevelService } from '../../../services/positionLevel.service';
import { RegionService } from '../../../services/region.service';
import { SectorService } from '../../../services/sectorService';
import { ValidationService } from '../../../services/validation.service';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { AuthService } from '../../../services/auth.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCv } from '../../../models/component/personelUserCv';

@Component({
  selector: 'app-personelUserCvWorkExperienceUpdate',
  templateUrl: './personelUserCvWorkExperienceUpdate.component.html',
  styleUrls: ['./personelUserCvWorkExperienceUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class PersonelUserCvWorkExperienceUpdateComponent implements OnInit {
  @Input() personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO;
  personelUserCvs: PersonelUserCv[] = [];
  departments: Department[] = [];
  companySectors: Sector[] = [];
  workingMethods: WorkingMethod[] = [];
  countries: Country[] = [];
  cities: City[] = [];
  regions: Region[] = [];
  positions: Position[] = [];
  positionLevels: PositionLevel[] = [];
  detailCount: number;
  today: number = Date.now();
  admin: boolean = false;
  componentTitle = 'Personel User Cv Work Experience Update Form';

  constructor(
    private personelUserCvWorkExperienceService: PersonelUserCvWorkExperienceService,
    private personelUserCvService: PersonelUserCvService,
    private countryService: CountryService,
    private cityService: CityService,
    private regionService: RegionService,
    private departmentService: DepartmentService,
    private sectorService: SectorService,
    private workingMethodService: WorkingMethodService,
    private positionService: PositionService,
    private positionLevelService: PositionLevelService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.getSectors();
    this.getCountries();
    this.getCities('');
    this.getRegions('');
    this.getWorkingMethods();
    this.getDepartments();
    this.getPositions();
    this.getPositionLevels();

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
        this.validationService.handleSuccesses(response);
        this.personelUserCvWorkExperienceDTO.cvId = response.data.cvId;
        this.personelUserCvWorkExperienceDTO.startDate = this.formatDate(
          response.data.startDate
        );
        this.personelUserCvWorkExperienceDTO.endDate = this.formatDate(
          response.data.endDate
        );
        if (this.personelUserCvWorkExperienceDTO.endDate == '1899-12-31') {
          this.endDateClear();
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
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
      id: this.personelUserCvWorkExperienceDTO.id,
      userId: this.personelUserCvWorkExperienceDTO.userId,
      personelUserId: this.personelUserCvWorkExperienceDTO.personelUserId,
      cvId: this.personelUserCvWorkExperienceDTO.cvId,
      companyName: this.personelUserCvWorkExperienceDTO.companyName,
      positionId: this.getPositionId(
        this.personelUserCvWorkExperienceDTO.positionName
      ),
      positionLevelId: this.getPositionLevelId(
        this.personelUserCvWorkExperienceDTO.positionLevelName
      ),
      working: this.personelUserCvWorkExperienceDTO.working,
      startDate: new Date(
        this.personelUserCvWorkExperienceDTO.startDate
      ).toJSON(),
      endDate: new Date(
        this.setNullDateValue(this.personelUserCvWorkExperienceDTO.endDate)
      ).toJSON(),

      companySectorId: this.getCompanySectorId(
        this.personelUserCvWorkExperienceDTO.companySectorName
      ),
      departmentId: this.getDepartmentId(
        this.personelUserCvWorkExperienceDTO.departmentName
      ),
      foundJobInHere: this.personelUserCvWorkExperienceDTO.foundJobInHere,

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

      detail: this.setNullValue(this.personelUserCvWorkExperienceDTO.detail),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
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

  count() {
    this.detailCount = this.personelUserCvWorkExperienceDTO.detail.length;
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
        this.validationService.handleSuccesses(response);
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
        this.cities = response.data.filter(
          (c) => c.countryId === this.getCountryId(countryName)
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getRegions(cityName: string) {
    this.regionService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.regions = response.data
          .filter((r) => r.cityId === this.getCityId(cityName))
          .filter((f) => f.regionName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getSectorNameById(sectorId: string): any {
    const sectorName = this.companySectors.filter((c) => c.id === sectorId)[0]
      ?.sectorName;
    return sectorName;
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
    this.personelUserCvWorkExperienceDTO.positionName = '';
  }

  positionLevelNameClear() {
    this.personelUserCvWorkExperienceDTO.positionLevelName = '';
  }

  detailClear() {
    this.personelUserCvWorkExperienceDTO.detail = '';
  }
}
