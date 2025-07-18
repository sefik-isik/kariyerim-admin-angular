import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUser } from '../../../models/component/companyUser';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';
import { CompanyUserService } from '../../../services/companyUser.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserDetailComponent } from '../companyUserDetail/companyUserDetail.component';
import { CompanyUserFollowAddComponent } from '../companyUserFollowAdd/companyUserFollowAdd.component';
import { CompanyUserUpdateComponent } from '../companyUserUpdate/companyUserUpdate.component';
import { CompanyUserCode } from '../../../models/concrete/userCodes';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserFollowListComponent } from '../companyUserFollowList/companyUserFollowList.component';
import { PersonelUserFollowCompanyUserService } from '../../../services/personelUserFollowCompanyUser.service';
import { PersonelUserFollowCompanyUser } from '../../../models/component/personelUserFollowCompanyUser';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { FilterCompanyUserPipe } from '../../../pipes/filterCompanyUser.pipe';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserList',
  templateUrl: './companyUserList.component.html',
  styleUrls: ['./companyUserList.component.css'],
  imports: [CommonModule, FormsModule, FilterUserPipe, FilterCompanyUserPipe],
})
export class CompanyUserListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  filter2: string = '';
  isCompanyUser: boolean = true;
  admin: boolean = false;
  componentTitle = 'Company Users';

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService,
    private personelUserFollowCompanyUserService: PersonelUserFollowCompanyUserService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.checkUserCode();

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
        this.getPersonelUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
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

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
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

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
  }

  delete(companyUser: CompanyUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserService.delete(companyUser).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.delete(companyUser).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  followAdd(companyUserDTO: CompanyUserDTO) {
    this.personelUserFollowCompanyUserService
      .add(this.getModel(companyUserDTO))
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
  }

  getModel(companyUserDTO: CompanyUserDTO): PersonelUserFollowCompanyUser {
    return Object.assign({
      id: '',
      companyUserId: companyUserDTO.id,
      personelUserId: this.getPersonelUserId(
        this.localStorageService.getFromLocalStorage('email')
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  open(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  openFollowAdd(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserFollowAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  openFollowList(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserFollowListComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  openDetail(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }

  clearInput2() {
    this.filter2 = null;
    this.ngOnInit();
  }
}
