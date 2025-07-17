import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserAdvertByUserPipe } from '../../../pipes/filterCompanyUserAdvertByUser.pipe';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserAdvertDetailComponent } from '../companyUserAdvertDetail/companyUserAdvertDetail.component';
import { CompanyUserAdvertUpdateComponent } from '../companyUserAdvertUpdate/companyUserAdvertUpdate.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-companyUserAdvertDeletedList',
  templateUrl: './companyUserAdvertDeletedList.component.html',
  styleUrls: ['./companyUserAdvertDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserAdvertByUserPipe],
})
export class CompanyUserAdvertDeletedListComponent implements OnInit {
  companyUserAdvertDTOs: CompanyUserAdvertDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Deleted Company User Addresses';
  userId: string;

  constructor(
    private companyUserAdvertService: CompanyUserAdvertService,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
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
        this.getAllCompanyUsers(response);
        this.getCompanyUserAdverts(response);
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

  getCompanyUserAdverts(adminModel: AdminModel) {
    this.companyUserAdvertService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserAdvertDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    this.companyUserAdvertService.update(companyUserAdvertDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.companyUserAdvertDTOs.forEach((companyUserAdvertDTO) => {
      this.companyUserAdvertService.update(companyUserAdvertDTO).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(companyUserAddress: CompanyUserAdvertDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserAdvertService.terminate(companyUserAddress).subscribe(
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

    this.companyUserAdvertDTOs.forEach((companyUserAdvertDTO) => {
      this.companyUserAdvertService.terminate(companyUserAdvertDTO).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    const modalRef = this.modalService.open(CompanyUserAdvertUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserAdvertDTO = companyUserAdvertDTO;
  }

  openDetail(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    const modalRef = this.modalService.open(CompanyUserAdvertDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserAdvertDTO = companyUserAdvertDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
