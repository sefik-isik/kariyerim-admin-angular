import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';

import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUser } from '../../../models/component/personelUser';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterPersonelUserPipe } from '../../../pipes/filterPersonelUser.pipe';
import { GenderPipe } from '../../../pipes/gender.pipe';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { PersonelUserDetailComponent } from '../personelUserDetail/personelUserDetail.component';
import { PersonelUserUpdateComponent } from '../personelUserUpdate/personelUserUpdate.component';

@Component({
  selector: 'app-personelUserDeletedList',
  templateUrl: './personelUserDeletedList.component.html',
  styleUrls: ['./personelUserDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserPipe, GenderPipe],
})
export class PersonelUserDeletedListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Personel Users';

  constructor(
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService,
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
        this.getAllPersonelUsers(response);
        this.getPersonelUsers(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(personelUser: PersonelUser) {
    this.personelUserService.update(personelUser).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.personelUserDTOs.forEach((personelUserDTO) => {
      this.personelUserService.update(personelUserDTO).subscribe(
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

  terminate(personelUserDTO: PersonelUserDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserService.terminate(personelUserDTO).subscribe(
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

    this.personelUserDTOs.forEach((personelUserDTO) => {
      this.personelUserService.terminate(personelUserDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
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
