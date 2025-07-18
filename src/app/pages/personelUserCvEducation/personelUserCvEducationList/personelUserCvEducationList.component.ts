import { ValidationService } from './../../../services/validation.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { AdminService } from '../../../services/helperServices/admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { FilterPersonelUserCvEducationByUserPipe } from '../../../pipes/filterPersonelUserCvEducationByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { PersonelUserCvEducationDetailComponent } from '../personelUserCvEducationDetail/personelUserCvEducationDetail.component';
import { PersonelUserCvEducationUpdateComponent } from '../personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { NullDateFormatPipe } from '../../../pipes/nullDateFormat.pipe';

@Component({
  selector: 'app-personelUserCvEducationList',
  templateUrl: './personelUserCvEducationList.component.html',
  styleUrls: ['./personelUserCvEducationList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterPersonelUserCvEducationByUserPipe,
    NullDateFormatPipe,
  ],
})
export class PersonelUserCvEducationListComponent implements OnInit {
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvEducationDTOs: PersonelUserCvEducationDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Cv Educations';

  constructor(
    private personelUserCvEducationService: PersonelUserCvEducationService,
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
        this.getPersonelUserCvEducations(response);
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

  getPersonelUserCvEducations(adminModel: AdminModel) {
    this.personelUserCvEducationService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvEducationDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvEducationService
      .delete(personelUserCvEducationDTO)
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
    this.personelUserCvEducationDTOs.forEach((personelUserCvEducationDTO) => {
      this.personelUserCvEducationService
        .delete(personelUserCvEducationDTO)
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

  open(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvEducationUpdateComponent,
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
    modalRef.componentInstance.personelUserCvEducationDTO =
      personelUserCvEducationDTO;
  }

  openDetail(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvEducationDetailComponent,
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
    modalRef.componentInstance.personelUserCvEducationDTO =
      personelUserCvEducationDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
