import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserCoverLetter } from '../../../models/component/personelUserCoverLetter';
import { PersonelUserCoverLetterDTO } from '../../../models/dto/personelUserCoverLetterDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { FilterPersonelUserCoverLetterByUserPipe } from '../../../pipes/filterPersonelUserCoverLetterByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { PersonelUserCoverLetterDetailComponent } from '../personelUserCoverLetterDetail/personelUserCoverLetterDetail.component';
import { PersonelUserCoverLetterUpdateComponent } from '../personelUserCoverLetterUpdate/personelUserCoverLetterUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCoverLetterList',
  templateUrl: './personelUserCoverLetterList.component.html',
  styleUrls: ['./personelUserCoverLetterList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCoverLetterByUserPipe],
})
export class PersonelUserCoverLetterListComponent implements OnInit {
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
        this.getPersonelUsers(response);
        this.getPersonelUserCoverLetter(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
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

  getPersonelUserCoverLetter(adminModel: AdminModel) {
    this.personelUserCoverLetterService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCoverLetterDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(personelUserCoverLetter: PersonelUserCoverLetter) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCoverLetterService
      .delete(personelUserCoverLetter)
      .subscribe(
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
    this.personelUserCoverLetterDTOs.forEach((personelUserCoverLetterDTO) => {
      this.personelUserCoverLetterService
        .delete(personelUserCoverLetterDTO)
        .subscribe(
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
