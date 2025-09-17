import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserCode } from '../../../models/concrete/userCodes';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserFollowCompanyUserDTO } from '../../../models/dto/personelUserFollowCompanyUserDTO';
import { FilterFollowCompanyByPersonelUserPipe } from '../../../pipes/filterFollowCompanyByPersonelUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserService } from '../../../services/companyUser.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserFollowCompanyUserService } from '../../../services/personelUserFollowCompanyUser.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserFollowList',
  templateUrl: './companyUserFollowList.component.html',
  styleUrls: ['./companyUserFollowList.component.css'],
  imports: [CommonModule, FormsModule, FilterFollowCompanyByPersonelUserPipe],
})
export class CompanyUserFollowListComponent implements OnInit {
  @Input() companyUserDTO: CompanyUserDTO;
  personelUserFollowCompanyUserDTOs: PersonelUserFollowCompanyUserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  filter1: string = '';
  admin: boolean = false;
  isCompanyUser: boolean = true;
  componentTitle = 'Company User Follow By Personel Users';

  constructor(
    private personelUserFollowCompanyUserService: PersonelUserFollowCompanyUserService,
    private companyUserService: CompanyUserService,
    private personelUserService: PersonelUserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService,
    public activeModal: NgbActiveModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.checkUserCode();
    this.getAdminValues();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  checkUserCode() {
    if (
      this.localStorageService.getFromLocalStorage('code') == CompanyUserCode
    ) {
      this.isCompanyUser = true;
    } else {
      this.isCompanyUser = false;
    }
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
        this.getAllPersonelUsers(response);
        this.getPersonelUserFollowCompanyUsers(response);
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
            (f) => f.companyUserId == this.companyUserDTO.id
          );
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDTOs = response.data.filter(
          (f) => f.id == this.companyUserDTO.id
        );
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminate(
    personelUserFollowCompanyUserDTO: PersonelUserFollowCompanyUserDTO
  ) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserFollowCompanyUserService
      .terminate(personelUserFollowCompanyUserDTO)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success('Başarı ile kalıcı olarak silindi');
          this.ngOnInit();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserFollowCompanyUserDTOs.forEach(
      (personelUserFollowCompanyUser) => {
        this.personelUserFollowCompanyUserService
          .terminate(personelUserFollowCompanyUser)
          .subscribe(
            (response) => {
              this.validationService.handleSuccesses(response);
            },
            (responseError) =>
              this.validationService.handleErrors(responseError)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
