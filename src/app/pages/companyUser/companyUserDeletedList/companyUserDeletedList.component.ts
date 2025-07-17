import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserUpdateComponent } from '../companyUserUpdate/companyUserUpdate.component';
import { CompanyUserDetailComponent } from '../companyUserDetail/companyUserDetail.component';
import { AuthService } from '../../../services/auth.service';
import { FilterCompanyUserPipe } from '../../../pipes/filterCompanyUser.pipe';

@Component({
  selector: 'app-companyUserDeletedList',
  templateUrl: './companyUserDeletedList.component.html',
  styleUrls: ['./companyUserDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUserPipe, FilterCompanyUserPipe],
})
export class CompanyUserDeletedListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  dataLoaded = false;
  filter1 = '';
  filter2: string = '';
  admin: boolean = false;
  componentTitle = 'Company Users';
  userId: string;

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.find((c) => c.email === userEmail)?.id;

    return userId;
  }

  unDelete(companyUser: CompanyUserDTO) {
    this.companyUserService.update(companyUser).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.update(companyUser).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(companyUser: CompanyUserDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserService.terminate(companyUser).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.terminate(companyUser).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
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
