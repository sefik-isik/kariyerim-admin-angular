import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserAdvert } from '../../../models/component/companyUserAdvert';
import { DriverLicence } from '../../../models/component/driverLicence';
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
import { ValidationService } from '../../../services/validation.service';
import { WorkAreaService } from '../../../services/workArea.service';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { Experience } from './../../../models/component/experience';
import { WorkArea } from './../../../models/component/workArea';
import { WorkingMethod } from './../../../models/component/workingMethod';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';

@Component({
  selector: 'app-companyUserAdvertUpdate',
  templateUrl: './companyUserAdvertUpdate.component.html',
  styleUrls: ['./companyUserAdvertUpdate.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CompanyUserAdvertUpdateComponent implements OnInit {
  @Input() companyUserAdvertDTO: CompanyUserAdvertDTO;
  userDTOs: UserDTO[] = [];
  companyUsers: CompanyUserDTO[] = [];
  workAreas: WorkArea[] = [];
  workingMethods: WorkingMethod[] = [];
  experiences: Experience[] = [];
  companyUserDepartments: CompanyUserDepartment[] = [];
  licenseDegrees: LicenseDegree[] = [];
  driverLicences: DriverLicence[] = [];
  selectedImage: File | null = null;
  result: boolean = true;
  positions: Position[] = [];
  positionLevels: PositionLevel[] = [];
  languages: Language[] = [];
  languageLevels: LanguageLevel[] = [];
  admin: boolean = false;
  componentTitle = 'Company Advert Update Form';

  constructor(
    private companyUserAdvertService: CompanyUserAdvertService,
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
    this.getCompanyUserDepartments();
    this.getWorkingMethods();
    this.getWorkAreas();
    this.getExperiences();
    this.getLicenseDegrees();
    this.getPositions();
    this.getPositionLevels();
    this.getLanguages();
    this.getLanguageLevels();
    this.getDriverLicences();
  }

  checkImage() {
    if (this.companyUserAdvertDTO.advertImageName == 'noImage.jpg') {
      this.result = false;
    } else {
      this.result = true;
    }
  }

  onImageSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];

    const allowedImageTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
    ];

    if (!allowedImageTypes.includes(this.selectedImage.type)) {
      this.toastrService.error(
        'Please select a image with .png, .jpeg, webp or .gif extension',
        'Invalid image type'
      );
    } else if (this.selectedImage.size > 5 * 1024 * 1024) {
      this.toastrService.error(
        'Image size exceeds 5 MB. Please select a smaller image',
        'Image too large'
      );
    } else if (this.selectedImage.size < 1024) {
      this.toastrService.error(
        'Image size is too small. Please select a larger image',
        'Image too small'
      );
    } else {
      this.toastrService.success('File selected successfully', 'Success');
      this.companyUserAdvertDTO.advertImageName = this.selectedImage.name;
    }
  }

  deleteImage() {
    this.companyUserAdvertService.deleteImage(this.getModel()).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.result = false;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }

    if (!this.selectedImage) {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.companyUserAdvertService
      .uploadImage(formData, this.companyUserAdvertDTO.companyUserId)
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.companyUserAdvertDTO.advertImageName = event.body.name;
            this.companyUserAdvertDTO.advertImagePath = event.body.type;

            this.update();
          }
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
  }

  update() {
    this.companyUserAdvertService.update(this.getModel()).subscribe(
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
      id: this.companyUserAdvertDTO.id,
      userId: this.companyUserAdvertDTO.userId,
      companyUserId: this.companyUserAdvertDTO.companyUserId,
      advertName: this.companyUserAdvertDTO.advertName.trim(),
      advertImagePath: this.companyUserAdvertDTO.advertImagePath.trim(),
      advertImageName: this.companyUserAdvertDTO.advertImageName.trim(),
      advertImageOwnName: this.companyUserAdvertDTO.advertImageOwnName.trim(),
      workAreaId: this.getWorkAreaId(
        this.companyUserAdvertDTO.workAreaName.trim()
      ),
      workingMethodId: this.getWorkingMethodId(
        this.companyUserAdvertDTO.workingMethodName.trim()
      ),
      experienceId: this.getExperienceId(
        this.companyUserAdvertDTO.experienceName.trim()
      ),
      departmentId: this.getCompanyUserDepartmentId(
        this.companyUserAdvertDTO.departmentName.trim()
      ),
      licenseDegreeId: this.getLicenseDegreeId(
        this.companyUserAdvertDTO.licenseDegreeName.trim()
      ),
      positionId: this.getPositionId(this.companyUserAdvertDTO.positionName),
      positionLevelId: this.getPositionLevelId(
        this.companyUserAdvertDTO.positionLevelName
      ),
      militaryStatus: this.companyUserAdvertDTO.militaryStatus,
      languageId: this.getLanguageId(
        this.companyUserAdvertDTO.languageName.trim()
      ),
      languageLevelId: this.getLanguageLevelId(
        this.companyUserAdvertDTO.languageLevelName.trim()
      ),
      driverLicenceId: this.getDriverLicenceId(
        this.companyUserAdvertDTO.driverLicenceName.trim()
      ),
      createdDate: new Date(Date.now()).toJSON(),
      updatedDate: new Date(Date.now()).toJSON(),
      deletedDate: new Date(Date.now()).toJSON(),
    });
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
  getExperiences() {
    this.experienceService.getAll().subscribe(
      (response) => {
        this.companyUserAdvertDTO.experienceId = response.data.filter(
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
        this.companyUserAdvertDTO.licenseDegreeId = response.data.filter(
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
        this.companyUserAdvertDTO.driverLicenceId = response.data.filter(
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
        this.companyUserAdvertDTO.languageId = response.data.filter(
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
        this.companyUserAdvertDTO.languageLevelId = response.data.filter(
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
      ? (experienceId = this.companyUserAdvertDTO.experienceId)
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
      ? (licenseDegreeId = this.companyUserAdvertDTO.licenseDegreeId)
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
      ? (driverLicenceId = this.companyUserAdvertDTO.driverLicenceId)
      : (driverLicenceId = this.driverLicences.filter(
          (c) => c.driverLicenceName === driverLicenceName
        )[0]?.id);

    return driverLicenceId;
  }

  getLanguageId(languageName: string): string {
    let languageId: string;

    languageName == null || languageName == '' || languageName == '-'
      ? (languageId = this.companyUserAdvertDTO.languageId)
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
      ? (languageLevelId = this.companyUserAdvertDTO.languageLevelId)
      : (languageLevelId = this.languageLevels.filter(
          (c) => c.levelTitle === languageLevelitle
        )[0]?.id);

    return languageLevelId;
  }

  advertNameClear() {
    this.companyUserAdvertDTO.advertName = '';
  }

  advertImageNameClear() {
    this.companyUserAdvertDTO.advertImageName = '';
  }

  advertImageOwnNameClear() {
    this.companyUserAdvertDTO.advertImageOwnName = '';
  }

  workAreaNameClear() {
    this.companyUserAdvertDTO.workAreaName = '';
  }

  workingMethodNameClear() {
    this.companyUserAdvertDTO.workingMethodName = '';
  }

  experienceNameClear() {
    this.companyUserAdvertDTO.experienceName = '';
  }

  departmentNameClear() {
    this.companyUserAdvertDTO.departmentName = '';
  }

  licenseDegreeNameClear() {
    this.companyUserAdvertDTO.licenseDegreeName = '';
  }

  positionNameClear() {
    this.companyUserAdvertDTO.positionName = '';
  }

  positionLevelNameClear() {
    this.companyUserAdvertDTO.positionLevelName = '';
  }

  languageNameClear() {
    this.companyUserAdvertDTO.languageName = '';
  }

  languageLevelNameClear() {
    this.companyUserAdvertDTO.languageLevelName = '';
  }

  driverLicenceNameClear() {
    this.companyUserAdvertDTO.driverLicenceName = '';
  }
}
