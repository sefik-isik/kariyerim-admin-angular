import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { CompanyUser } from '../../../models/component/companyUser';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserUpdateComponent } from '../companyUserUpdate/companyUserUpdate.component';
import { CompanyUserDetailComponent } from '../companyUserDetail/companyUserDetail.component';

@Component({
  selector: 'app-companyUserList',
  templateUrl: './companyUserList.component.html',
  styleUrls: ['./companyUserList.component.css'],
  imports: [CommonModule, FormsModule, FilterUserPipe],
})
export class CompanyUserListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  userId: string;
  componentTitle = 'Company Users';

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
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
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (responseError) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (responseError) => console.log(responseError)
    );
  }

  getUserId(userEmail: string): string {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  delete(companyUser: CompanyUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserService.delete(companyUser).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => console.error
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.delete(companyUser).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  openDetail(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
