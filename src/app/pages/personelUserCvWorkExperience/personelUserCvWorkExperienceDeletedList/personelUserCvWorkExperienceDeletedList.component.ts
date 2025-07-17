import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { FilterPersonelUserCvWorkExperienceByUserPipe } from './../../../pipes/filterPersonelUserCvWorkExperienceByUser.pipe';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';

import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { AuthService } from '../../../services/auth.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvWorkExperienceDetailComponent } from '../personelUserCvWorkExperienceDetail/personelUserCvWorkExperienceDetail.component';
import { PersonelUserCvWorkExperienceUpdateComponent } from '../personelUserCvWorkExperienceUpdate/personelUserCvWorkExperienceUpdate.component';

@Component({
  selector: 'app-personelUserCvWorkExperienceDeletedList',
  templateUrl: './personelUserCvWorkExperienceDeletedList.component.html',
  styleUrls: ['./personelUserCvWorkExperienceDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterPersonelUserCvWorkExperienceByUserPipe,
  ],
})
export class PersonelUserCvWorkExperienceDeletedListComponent
  implements OnInit
{
  personelUserDTOs: PersonelUserDTO[] = [];
  personelUserCvWorkExperienceDTOs: PersonelUserCvWorkExperienceDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Cv Work Experiences';

  constructor(
    private personelUserCvWorkExperienceService: PersonelUserCvWorkExperienceService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private personelUserService: PersonelUserService,
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
        this.getPersonelUserCvWorkExperiences(response);
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

  getPersonelUserCvWorkExperiences(adminModel: AdminModel) {
    this.personelUserCvWorkExperienceService
      .getDeletedAllDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserCvWorkExperienceDTOs = response.data;
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
  }

  unDelete(personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO) {
    this.personelUserCvWorkExperienceService
      .update(personelUserCvWorkExperienceDTO)
      .subscribe(
        (response) => {
          this.toastrService.success('Başarı ile geri alındı');
          this.ngOnInit();
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
  }

  unDeleteAll() {
    this.personelUserCvWorkExperienceDTOs.forEach(
      (personelUserCvWorkExperienceDTO) => {
        this.personelUserCvWorkExperienceService
          .update(personelUserCvWorkExperienceDTO)
          .subscribe(
            (response) => {},
            (responseError) =>
              this.toastrService.error(responseError.error.message)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserCvWorkExperienceService
      .terminate(personelUserCvWorkExperienceDTO)
      .subscribe(
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

    this.personelUserCvWorkExperienceDTOs.forEach(
      (personelUserCvWorkExperienceDTO) => {
        this.personelUserCvWorkExperienceService
          .terminate(personelUserCvWorkExperienceDTO)
          .subscribe(
            (response) => {},
            (responseError) =>
              this.toastrService.error(responseError.error.message)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvWorkExperienceUpdateComponent,
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
    modalRef.componentInstance.personelUserCvWorkExperienceDTO =
      personelUserCvWorkExperienceDTO;
  }

  openDetail(personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvWorkExperienceDetailComponent,
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
    modalRef.componentInstance.personelUserCvWorkExperienceDTO =
      personelUserCvWorkExperienceDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
