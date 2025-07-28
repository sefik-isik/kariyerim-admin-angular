import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { City } from '../../../models/component/city';
import { CompanyUserAdvert } from '../../../models/component/companyUserAdvert';
import { CompanyUserAdvertJobDescription } from '../../../models/component/companyUserAdvertJobDescription';
import { CompanyUserAdvertJobDescriptionDTO } from '../../../models/dto/companyUserAdvertJobDescriptionDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { CompanyUserAdvertJobDescriptionService } from '../../../services/companyUserAdvertJobDescription.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { AuthService } from '../../../services/auth.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { angularEditorConfig } from '../../../models/concrete/angularEditorConfig';

@Component({
  selector: 'app-companyUserAdvertJobDescriptionAdd',
  templateUrl: './companyUserAdvertJobDescriptionAdd.component.html',
  styleUrls: ['./companyUserAdvertJobDescriptionAdd.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularEditorModule,
  ],
})
export class CompanyUserAdvertJobDescriptionAddComponent implements OnInit {
  companyUserAdvertJobDescriptionModel: CompanyUserAdvertJobDescriptionDTO =
    {} as CompanyUserAdvertJobDescriptionDTO;
  userDTOs: UserDTO[] = [];
  companyUsers: CompanyUserDTO[] = [];
  companyUserAdverts: CompanyUserAdvert[] = [];
  workCities: City[] = [];
  editorCount: number = 0;
  admin: boolean = false;
  componentTitle = 'Company User Advert Job Description Add Form';

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private companyUserAdvertJobDescriptionService: CompanyUserAdvertJobDescriptionService,
    private companyUserAdvertService: CompanyUserAdvertService,
    private userService: UserService,
    private companyUserService: CompanyUserService,
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
  }

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.companyUserAdvertJobDescriptionService
        .add(this.getModel())
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
            this.activeModal.close();
            this.toastrService.success(response.message, 'Başarılı');
            this.router.navigate([
              '/dashboard/companyuseradvertjobdescription/companyuseradvertjobdescriptionlisttab',
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

  getModel(): CompanyUserAdvertJobDescription {
    return Object.assign({
      id: '',
      userId: this.getUserId(
        this.companyUserAdvertJobDescriptionModel.email.trim()
      ),
      companyUserId: this.getCompanyUserId(
        this.companyUserAdvertJobDescriptionModel.companyUserName.trim()
      ),
      advertId: this.getCompanyUserAdvertId(
        this.companyUserAdvertJobDescriptionModel.advertName.trim()
      ),
      title: this.companyUserAdvertJobDescriptionModel.title.trim(),
      description: this.htmlContent,
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
        this.getCompanyUserAdverts(response);
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
          this.companyUserAdvertJobDescriptionModel.email =
            this.localStorageService.getFromLocalStorage('email');
          this.companyUserAdvertJobDescriptionModel.userId =
            this.localStorageService.getFromLocalStorage('id');
        }
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    const userId = this.getUserId(
      this.companyUserAdvertJobDescriptionModel.email
    );

    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUsers = response.data.filter(
          (f) => f.email == this.companyUserAdvertJobDescriptionModel.email
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setCompanyUserMail(email: string) {
    this.companyUserAdvertJobDescriptionModel.email = email;

    this.getAdminValues();
  }

  setCompanyUserName(name: string) {
    this.companyUserAdvertJobDescriptionModel.companyUserName = name;

    this.getAdminValues();
  }

  getCompanyUserAdverts(adminModel: AdminModel) {
    this.companyUserAdvertService.getAll(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserAdverts = response.data.filter(
          (f) =>
            f.companyUserId ==
            this.getCompanyUserId(
              this.companyUserAdvertJobDescriptionModel.companyUserName
            )
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  count() {
    this.editorCount = this.htmlContent.length;
  }

  getUserId(email: string): string {
    let userId;

    if (this.admin) {
      userId = this.userDTOs.filter((c) => c.email === email)[0]?.id;
    } else {
      userId = this.companyUserAdvertJobDescriptionModel.userId;
    }

    return userId;
  }

  getCompanyUserId(companyUserName: string): string {
    const companyUserId = this.companyUsers.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  getCompanyUserAdvertId(companyUserAdvertName: string): string {
    const companyUserAdvertId = this.companyUserAdverts.filter(
      (w) => w.advertName === companyUserAdvertName
    )[0]?.id;

    return companyUserAdvertId;
  }

  getWorkCityId(workCityName: string): string {
    const workCityId = this.workCities.filter(
      (w) => w.cityName === workCityName
    )[0]?.id;

    return workCityId;
  }

  emailClear() {
    this.companyUserAdvertJobDescriptionModel.email = '';
  }

  companyUserNameClear() {
    this.companyUserAdvertJobDescriptionModel.companyUserName = '';
  }

  advertNameClear() {
    this.companyUserAdvertJobDescriptionModel.advertName = '';
  }

  titleClear() {
    this.companyUserAdvertJobDescriptionModel.title = '';
  }

  descriptionClear() {
    this.htmlContent = '';
  }
}
