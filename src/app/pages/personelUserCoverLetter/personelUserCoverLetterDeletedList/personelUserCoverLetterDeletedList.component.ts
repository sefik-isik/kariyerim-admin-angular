import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCoverLetter } from '../../../models/component/personelUserCoverLetter';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { FilterPersonelUserCoverLetterByUserPipe } from '../../../pipes/filterPersonelUserCoverLetterByUser.pipe';
import { PersonelUserCoverLetterDTO } from '../../../models/dto/personelUserCoverLetterDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCoverLetterUpdateComponent } from '../personelUserCoverLetterUpdate/personelUserCoverLetterUpdate.component';
import { PersonelUserCoverLetterDetailComponent } from '../personelUserCoverLetterDetail/personelUserCoverLetterDetail.component';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCoverLetterDeletedList',
  templateUrl: './personelUserCoverLetterDeletedList.component.html',
  styleUrls: ['./personelUserCoverLetterDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCoverLetterByUserPipe],
})
export class PersonelUserCoverLetterDeletedListComponent implements OnInit {
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCoverLetterDTOs: PersonelUserCoverLetterDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Cover Letters';

  constructor(
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
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
        this.getPersonelUsers(response);
        this.getPersonelUserCoverLetter(response);
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

  getPersonelUserCoverLetter(adminModel: AdminModel) {
    this.personelUserCoverLetterService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCoverLetterDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(personelUserCoverLetter: PersonelUserCoverLetter) {
    this.personelUserCoverLetterService
      .update(personelUserCoverLetter)
      .subscribe(
        (response) => {
          this.toastrService.success('Başarı ile silindi');
          this.ngOnInit();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  unDeleteAll() {
    this.personelUserCoverLetterDTOs.forEach((personelUserCoverLetterDTO) => {
      this.personelUserCoverLetterService
        .update(personelUserCoverLetterDTO)
        .subscribe(
          (response) => {},
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(personelUserCoverLetterDTO: PersonelUserCoverLetterDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserCoverLetterService
      .terminate(personelUserCoverLetterDTO)
      .subscribe(
        (response) => {
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

    this.personelUserCoverLetterDTOs.forEach((personelUserCoverLetterDTO) => {
      this.personelUserCoverLetterService
        .terminate(personelUserCoverLetterDTO)
        .subscribe(
          (response) => {},
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(personelUserCoverLetterDTO: PersonelUserCoverLetterDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCoverLetterUpdateComponent,
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
    modalRef.componentInstance.personelUserCoverLetterDTO =
      personelUserCoverLetterDTO;
  }

  openDetail(personelUserCoverLetterDTO: PersonelUserCoverLetterDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCoverLetterDetailComponent,
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
    modalRef.componentInstance.personelUserCoverLetterDTO =
      personelUserCoverLetterDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
