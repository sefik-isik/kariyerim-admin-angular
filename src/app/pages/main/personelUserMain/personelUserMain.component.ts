import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserFollowCompanyUserDTO } from '../../../models/dto/personelUserFollowCompanyUserDTO';
import { PersonelUserFollowCompanyUserService } from '../../../services/personelUserFollowCompanyUser.service';
import { PersonelUserAdvertFollowDTO } from '../../../models/dto/personelUserAdvertFollowDTO';
import { PersonelUserAdvertFollowService } from '../../../services/personelUserAdvertFollow.service';
import { PersonelUserAdvertApplicationDTO } from '../../../models/dto/personelUserAdvertApplicationDTO';
import { PersonelUserAdvertApplicationService } from '../../../services/personelUserAdvertApplication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personelUserMain',
  templateUrl: './personelUserMain.component.html',
  styleUrls: ['./personelUserMain.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PersonelUserMainComponent implements OnInit {
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserFollowCompanyUserDTOs: PersonelUserFollowCompanyUserDTO[] = [];
  personelUserAdvertFollowDTOs: PersonelUserAdvertFollowDTO[] = [];
  personelUserAdvertApplicationDTOs: PersonelUserAdvertApplicationDTO[] = [];
  admin: boolean = false;
  personelUserId: string = '';
  advertId: string = '';

  constructor(
    private personelUserFollowCompanyUserService: PersonelUserFollowCompanyUserService,
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService,
    private personelUserAdvertApplicationService: PersonelUserAdvertApplicationService,
    private personelUserService: PersonelUserService,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private authService: AuthService,
    private modalService: NgbModal,
    private validationService: ValidationService
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
        this.getPersonelUsers(response);
        this.getPersonelUserFollowCompanyUsers(response);
        this.getPersonelUserAdvertFollows(response);
        this.getPersonelUserApplicationFollows(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  setPersonelUserId(id: string) {
    this.personelUserId = id;
    this.advertId = '';
    this.getAdminValues();
  }

  setAdvertId(id: string) {
    this.advertId = id;
    this.getAdminValues();
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserFollowCompanyUsers(adminModel: AdminModel) {
    this.personelUserFollowCompanyUserService
      .getAllByPersonelIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.personelUserFollowCompanyUserDTOs = response.data.filter(
            (f) => f.personelUserId == this.personelUserId
          );
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  getPersonelUserAdvertFollows(adminModel: AdminModel) {
    adminModel.id = this.personelUserId;
    this.personelUserAdvertFollowService
      .getAllByPersonelIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.personelUserAdvertFollowDTOs = response.data;
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  getPersonelUserApplicationFollows(adminModel: AdminModel) {
    adminModel.id = this.personelUserId;
    this.personelUserAdvertApplicationService
      .getAllByPersonelIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.personelUserAdvertApplicationDTOs = response.data;
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }
}
