import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { PersonelUserAdvertApplicationDTO } from '../../../models/dto/personelUserAdvertApplicationDTO';
import { PersonelUserAdvertFollowDTO } from '../../../models/dto/personelUserAdvertFollowDTO';
import { PersonelUserFollowCompanyUserDTO } from '../../../models/dto/personelUserFollowCompanyUserDTO';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserAdvertApplicationService } from '../../../services/personelUserAdvertApplication.service';
import { PersonelUserAdvertFollowService } from '../../../services/personelUserAdvertFollow.service';
import { PersonelUserFollowCompanyUserService } from '../../../services/personelUserFollowCompanyUser.service';
import { ValidationService } from '../../../services/validation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserMain',
  templateUrl: './companyUserMain.component.html',
  styleUrls: ['./companyUserMain.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CompanyUserMainComponent implements OnInit {
  companyUserDTOs: CompanyUserDTO[] = [];
  personelUserFollowCompanyUserDTOs: PersonelUserFollowCompanyUserDTO[] = [];
  companyUserAdvertDTOs: CompanyUserAdvertDTO[] = [];
  personelUserAdvertFollowDTOs: PersonelUserAdvertFollowDTO[] = [];
  personelUserAdvertApplicationDTOs: PersonelUserAdvertApplicationDTO[] = [];
  admin: boolean = false;
  companyUserId: string = '';
  advertId: string = '';

  constructor(
    private companyUserService: CompanyUserService,
    private personelUserFollowCompanyUserService: PersonelUserFollowCompanyUserService,
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService,
    private personelUserAdvertApplicationService: PersonelUserAdvertApplicationService,
    private companyUserAdvertService: CompanyUserAdvertService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private validationService: ValidationService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getCompanyUsers(response);
        this.getPersonelUserFollowCompanyUsers(response);
        this.getCompanyUserAdverts();
        this.getPersonelUserAdvertFollows(response);
        this.getPersonelUserAdvertApplications(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setCompanyUserId(id: string) {
    this.companyUserId = id;
    this.advertId = '';
    this.getAdminValues();
  }

  setAdvertId(id: string) {
    this.advertId = id;
    this.getAdminValues();
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserFollowCompanyUsers(adminModel: AdminModel) {
    this.personelUserFollowCompanyUserService
      .getAllByCompanyIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.personelUserFollowCompanyUserDTOs = response.data.filter(
            (f) => f.companyUserId === this.companyUserId
          );
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  getCompanyUserAdverts() {
    this.companyUserAdvertService.getAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserAdvertDTOs = response.data.filter(
          (f) => f.companyUserId === this.companyUserId
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserAdvertFollows(adminModel: AdminModel) {
    adminModel.id = this.advertId;
    this.personelUserAdvertFollowService
      .getAllByAdvertIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.personelUserAdvertFollowDTOs = response.data;
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  getPersonelUserAdvertApplications(adminModel: AdminModel) {
    adminModel.id = this.advertId;
    this.personelUserAdvertApplicationService
      .getAllByAdvertIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.personelUserAdvertApplicationDTOs = response.data;
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }
}
