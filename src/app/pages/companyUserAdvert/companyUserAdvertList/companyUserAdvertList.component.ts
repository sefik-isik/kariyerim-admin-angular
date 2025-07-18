import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserCode } from '../../../models/concrete/userCodes';
import { CompanyUserAdvertDTO } from '../../../models/dto/companyUserAdvertDTO';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { PersonelUserAdvertFollowDTO } from '../../../models/dto/personelUserAdvertFollowDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserAdvertByUserPipe } from '../../../pipes/filterCompanyUserAdvertByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserService } from '../../../services/companyUser.service';
import { CompanyUserAdvertService } from '../../../services/companyUserAdvert.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserAdvertFollowService } from '../../../services/personelUserAdvertFollow.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserAdvertApplicationAddComponent } from '../companyUserAdvertApplicationAdd/companyUserAdvertApplicationAdd.component';
import { CompanyUserAdvertDetailComponent } from '../companyUserAdvertDetail/companyUserAdvertDetail.component';
import { CompanyUserAdvertFollowAddComponent } from '../companyUserAdvertFollowAdd/companyUserAdvertFollowAdd.component';
import { PersonelUserAdvertApplicationDTO } from './../../../models/dto/personelUserAdvertApplicationDTO';
import { PersonelUserAdvertApplicationService } from '../../../services/personelUserAdvertApplication.service';
import { CompanyUserAdvertApplicationListComponent } from '../companyUserAdvertApplicationList/companyUserAdvertApplicationList.component';
import { CompanyUserAdvertFollowListComponent } from '../companyUserAdvertFollowList/companyUserAdvertFollowList.component';
import { CompanyUserAdvertUpdateComponent } from '../companyUserAdvertUpdate/companyUserAdvertUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserAdvertList',
  templateUrl: './companyUserAdvertList.component.html',
  styleUrls: ['./companyUserAdvertList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserAdvertByUserPipe],
})
export class CompanyUserAdvertListComponent implements OnInit {
  companyUserAdvertDTOs: CompanyUserAdvertDTO[] = [];
  personelUserAdvertFollowModel: PersonelUserAdvertFollowDTO =
    {} as PersonelUserAdvertFollowDTO;
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  isCompanyUser: boolean = true;
  admin: boolean = false;
  componentTitle = 'Deleted Company User Addresses';

  constructor(
    private companyUserAdvertService: CompanyUserAdvertService,
    private companyUserService: CompanyUserService,
    private personelUserService: PersonelUserService,
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService,
    private personelUserAdvertApplicationService: PersonelUserAdvertApplicationService,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService,
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
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
        this.getCompanyUserAdverts(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserAdverts(adminModel: AdminModel) {
    this.companyUserAdvertService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserAdvertDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserAdvertService.delete(companyUserAdvertDTO).subscribe(
      (response) => {
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
    this.companyUserAdvertDTOs.forEach((companyUserAdvertDTO) => {
      this.companyUserAdvertService.delete(companyUserAdvertDTO).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  followAdd(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    this.personelUserAdvertFollowService
      .add(this.getAdvertFollowModel(companyUserAdvertDTO))
      .subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
  }

  getAdvertFollowModel(
    companyUserAdvertDTO: CompanyUserAdvertDTO
  ): PersonelUserAdvertFollowDTO {
    return Object.assign({
      id: '',
      advertId: companyUserAdvertDTO.id,
      companyUserId: this.getCompanyUserId(
        companyUserAdvertDTO.companyUserName
      ),
      personelUserId: this.getPersonelUserId(
        this.localStorageService.getFromLocalStorage('email')
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  applicationAdd(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    this.personelUserAdvertApplicationService
      .add(this.getAdvertApplicationModel(companyUserAdvertDTO))
      .subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.validationService.handleErrors(responseError);
        }
      );
  }

  getAdvertApplicationModel(
    companyUserAdvertDTO: CompanyUserAdvertDTO
  ): PersonelUserAdvertApplicationDTO {
    return Object.assign({
      id: '',
      advertId: companyUserAdvertDTO.id,
      companyUserId: this.getCompanyUserId(
        companyUserAdvertDTO.companyUserName
      ),
      personelUserId: this.getPersonelUserId(
        this.localStorageService.getFromLocalStorage('email')
      ),
      createDate: new Date(Date.now()).toJSON(),
    });
  }

  getCompanyUserId(companyUserName: string): string {
    const companyUserId = this.companyUserDTOs.filter(
      (c) => c.companyUserName === companyUserName
    )[0]?.id;

    return companyUserId;
  }

  getPersonelUserId(email: string): string {
    const personelUserId = this.personelUserDTOs.filter(
      (c) => c.email === email
    )[0]?.id;

    return personelUserId;
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

  openFollowAdd(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertFollowAddComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.companyUserAdvertDTO = companyUserAdvertDTO;
  }

  openFollowList(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertFollowListComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.companyUserAdvertDTO = companyUserAdvertDTO;
  }

  openApplicationAdd(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertApplicationAddComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.companyUserAdvertDTO = companyUserAdvertDTO;
  }

  openApplicationList(companyUserAdvertDTO: CompanyUserAdvertDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertApplicationListComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
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
