import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { FilterPersonelUserCvWorkExperienceByUserPipe } from '../../../pipes/filterPersonelUserCvWorkExperienceByUser.pipe';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';

import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { AuthService } from '../../../services/auth.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvWorkExperienceDetailComponent } from '../personelUserCvWorkExperienceDetail/personelUserCvWorkExperienceDetail.component';
import { PersonelUserCvWorkExperienceUpdateComponent } from '../personelUserCvWorkExperienceUpdate/personelUserCvWorkExperienceUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvWorkExperienceList',
  templateUrl: './personelUserCvWorkExperienceList.component.html',
  styleUrls: ['./personelUserCvWorkExperienceList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterPersonelUserCvWorkExperienceByUserPipe,
  ],
})
export class PersonelUserCvWorkExperienceListComponent implements OnInit {
  personelUserCvWorkExperienceDTOs: PersonelUserCvWorkExperienceDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
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
        this.getPersonelUserCvWorkExperiences(response);
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

  getPersonelUserCvWorkExperiences(adminModel: AdminModel) {
    this.personelUserCvWorkExperienceService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvWorkExperienceDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvWorkExperienceService
      .delete(personelUserCvWorkExperienceDTO)
      .subscribe(
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
    this.personelUserCvWorkExperienceDTOs.forEach(
      (personelUserCvWorkExperienceDTO) => {
        this.personelUserCvWorkExperienceService
          .delete(personelUserCvWorkExperienceDTO)
          .subscribe(
            (response) => {},
            (responseError) =>
              this.validationService.handleErrors(responseError)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(personelUserCvWorkExperienceDTO: PersonelUserCvWorkExperienceDTO) {
    const modalRef = this.modalService.open(
      PersonelUserCvWorkExperienceUpdateComponent,
      {
        size: 'md',
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
