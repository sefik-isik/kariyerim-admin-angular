import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { FilterPersonelUserCvSummaryByUserPipe } from '../../../pipes/filterPersonelUserCvSummaryByUser.pipe';
import { AdminService } from '../../../services/helperServices/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserCvSummary } from '../../../models/component/personelUserCvSummary';
import { PersonelUserCvSummaryDTO } from '../../../models/dto/personelUserCvSummaryDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { AuthService } from '../../../services/auth.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvSummaryDetailComponent } from '../personelUserCvSummaryDetail/personelUserCvSummaryDetail.component';
import { PersonelUserCvSummaryUpdateComponent } from '../personelUserCvSummaryUpdate/personelUserCvSummaryUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvSummaryDeletedList',
  templateUrl: './personelUserCvSummaryDeletedList.component.html',
  styleUrls: ['./personelUserCvSummaryDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCvSummaryByUserPipe],
})
export class PersonelUserCvSummaryDeletedListComponent implements OnInit {
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvSummaryDTOs: PersonelUserCvSummaryDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Cv Summaries';

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private personelUserService: PersonelUserService,
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
        this.getPersonelUserCvSummaries(response);
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

  getPersonelUserCvSummaries(adminModel: AdminModel) {
    this.personelUserCvSummaryService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvSummaryDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(PersonelUserCvSummaries: PersonelUserCvSummary) {
    this.personelUserCvSummaryService.update(PersonelUserCvSummaries).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.personelUserCvSummaryDTOs.forEach((personelUserCvSummaryDTO) => {
      this.personelUserCvSummaryService
        .update(personelUserCvSummaryDTO)
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

  terminate(personelUserCvSummaryDTO: PersonelUserCvSummaryDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserCvSummaryService
      .terminate(personelUserCvSummaryDTO)
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

    this.personelUserCvSummaryDTOs.forEach((personelUserCvSummaryDTO) => {
      this.personelUserCvSummaryService
        .terminate(personelUserCvSummaryDTO)
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

  open(personelUserCvSummaryDTO: PersonelUserCvSummaryDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvSummaryUpdateComponent,
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
    modalRef.componentInstance.personelUserCvSummaryDTO =
      personelUserCvSummaryDTO;
  }

  openDetail(personelUserCvSummaryDTO: PersonelUserCvSummaryDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvSummaryDetailComponent,
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
    modalRef.componentInstance.personelUserCvSummaryDTO =
      personelUserCvSummaryDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
