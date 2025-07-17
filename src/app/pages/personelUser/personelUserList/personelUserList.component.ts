import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUser } from '../../../models/component/personelUser';
import { FilterPersonelUserPipe } from '../../../pipes/filterPersonelUser.pipe';
import { BoolenTextPipe } from '../../../pipes/boolenText.pipe';
import { GenderPipe } from '../../../pipes/gender.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserUpdateComponent } from '../personelUserUpdate/personelUserUpdate.component';
import { PersonelUserDetailComponent } from '../personelUserDetail/personelUserDetail.component';

import { AuthService } from '../../../services/auth.service';
import { PersonelUserFollowListComponent } from '../personelUserFollowList/personelUserFollowList.component';
import { PersonelUserAdvertFollowListComponent } from '../personelUserAdvertFollowList/personelUserAdvertFollowList.component';
import { PersonelUserAdvertApplicationListComponent } from '../personelUserAdvertApplicationList/personelUserAdvertApplicationList.component';

@Component({
  selector: 'app-personelUserList',
  templateUrl: './personelUserList.component.html',
  styleUrls: ['./personelUserList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterPersonelUserPipe,
    BoolenTextPipe,
    GenderPipe,
  ],
})
export class PersonelUserListComponent implements OnInit {
  personelUserDTOs: PersonelUserDTO[] = [];
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel Users';

  constructor(
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
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
        this.getPersonelUsers(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(personelUser: PersonelUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserService.delete(personelUser).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserDTOs.forEach((personelUserDTO) => {
      this.personelUserService.delete(personelUserDTO).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  openFollowList(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserFollowListComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  openAdvertFollowList(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(
      PersonelUserAdvertFollowListComponent,
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
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  openAdvertApplicationList(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(
      PersonelUserAdvertApplicationListComponent,
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
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  open(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  openDetail(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
