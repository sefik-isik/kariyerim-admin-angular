import { DriverLicence } from './../../../models/component/driverLicence';
import { Department } from './../../../models/component/department';
import { Experience } from './../../../models/component/experience';
import { WorkingMethod } from './../../../models/component/workingMethod';
import { WorkArea } from './../../../models/component/workArea';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { CompanyUserAdvert } from '../../../models/component/companyUserAdvert';
import { WorkAreaService } from '../../../services/workArea.service';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { ExperienceService } from '../../../services/experience.service';
import { LicenseDegreeService } from '../../../services/licenseDegree.service';
import { LicenseDegree } from '../../../models/component/licenseDegree';
import { HttpEventType } from '@angular/common/http';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { CompanyUserDepartmentDTO } from '../../../models/dto/companyUserDepartmentDTO';
import { Position } from '../../../models/component/position';
import { PositionLevel } from '../../../models/component/positionLevel';
import { PositionService } from '../../../services/position.service';
import { PositionLevelService } from '../../../services/positionLevel.service';
import { LanguageService } from '../../../services/language.service';
import { LanguageLevelService } from '../../../services/languageLevel.service';
import { Language } from '../../../models/component/language';
import { LanguageLevel } from '../../../models/component/languageLevel';
import { DriverLicenceService } from '../../../services/driverLicense.service';
import { AuthService } from '../../../services/auth.service';

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
  companyUserDepartments: CompanyUserDepartmentDTO[] = [];
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
      this.imageName = this.selectedImage.name;
    }
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (!this.selectedImage) {
      this.toastrService.error(
        'Please select a image to upload',
        'No image selected'
      );
      return;
    }

    if (!form.valid) {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
      return;
    }
    const formData = new FormData();
    formData.append('image', this.selectedImage, this.selectedImage.name);

    this.companyUserAdvertService
      .uploadImage(
        formData,
        this.getCompanyUserId(this.companyUserAdvertModel.companyUserName)
      )
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(event.loaded / (event.total * 100));
            console.log(`Image is ${percentDone}% uploaded.`);
          } else if (event.type === HttpEventType.Response) {
            this.imageName = event.body.name;
            this.imagePath = event.body.type;

            this.add();

            this.toastrService.success(
              'Company User Image Added Successfully',
              'Success'
            );
          }
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
  }

  add() {
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
      advertImageName: this.imageName,
      advertImagePath: this.imagePath,
      advertImageOwnName: this.companyUserAdvertModel.advertImageOwnName,
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
        this.getCompanyUserDepartments(response);
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
          this.companyUserAdvertModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.companyUserAdvertModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(this.companyUserAdvertModel.email);

    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUsers = response.data;
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
  getDriverLicences() {
    this.driverLicenceService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.driverLicences = response.data.filter(
          (f) => f.driverLicenceName != '-'
        );
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
  getLanguages() {
    this.languageService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.languages = response.data.filter((f) => f.languageName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getLanguageLevels() {
    this.languageLevelService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.languageLevels = response.data.filter((f) => f.levelTitle != '-');
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
        this.validationService.handleSuccesses(response);
        this.experiences = response.data.filter((f) => f.experienceName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }
  getCompanyUserDepartments(adminModel: AdminModel) {
    this.companyUserDepartmentService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDepartments = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getLicenseDegrees() {
    this.lisenseDegreeService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.licenseDegrees = response.data;
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
    if (experienceName == null || experienceName == '') {
      experienceName = '-';
    }
    const experienceId = this.experiences.filter(
      (e) => e.experienceName === experienceName
    )[0]?.id;
    return experienceId;
  }

  getLicenseDegreeId(licenseDegreeName: string): string {
    if (licenseDegreeName == null || licenseDegreeName == '') {
      licenseDegreeName = '-';
    }
    const licenceDegreeId = this.licenseDegrees.filter(
      (l) => l.licenseDegreeName === licenseDegreeName
    )[0]?.id;

    return licenceDegreeId;
  }

  getDriverLicenceId(driverLicenceName: string): string {
    if (driverLicenceName == null || driverLicenceName == '') {
      driverLicenceName = '-';
    }
    const languageLevelId = this.driverLicences.filter(
      (l) => l.driverLicenceName === driverLicenceName
    )[0]?.id;

    return languageLevelId;
  }

  getLanguageId(languageName: string): string {
    if (languageName == null || languageName == '') {
      languageName = '-';
    }
    const languageId = this.languages.filter(
      (l) => l.languageName === languageName
    )[0]?.id;

    return languageId;
  }

  getLanguageLevelId(languageLevelName: string): string {
    if (languageLevelName == null || languageLevelName == '') {
      languageLevelName = '-';
    }
    const languageLevelId = this.languageLevels.filter(
      (l) => l.levelTitle === languageLevelName
    )[0]?.id;

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

  advertImageNameClear() {
    this.companyUserAdvertModel.advertImageName = '';
  }

  advertImageOwnNameClear() {
    this.companyUserAdvertModel.advertImageOwnName = '';
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
}
