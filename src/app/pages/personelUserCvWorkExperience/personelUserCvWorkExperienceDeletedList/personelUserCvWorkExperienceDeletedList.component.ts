import { PersonelUserCvWorkExperienceDTO } from '../../../models/dto/personelUserCvWorkExperienceDTO';
import { FilterPersonelUserCvWorkExperienceByUserPipe } from './../../../pipes/filterPersonelUserCvWorkExperienceByUser.pipe';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonelUserCvWorkExperienceUpdateComponent } from '../personelUserCvWorkExperienceUpdate/personelUserCvWorkExperienceUpdate.component';
import { PersonelUserCvWorkExperienceDetailComponent } from '../personelUserCvWorkExperienceDetail/personelUserCvWorkExperienceDetail.component';

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
  userDTOs: UserDTO[] = [];
  personelUserCvWorkExperienceDTOs: PersonelUserCvWorkExperienceDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Cv Work Experiences Deleted List';
  userId: string;

  constructor(
    private personelUserCvWorkExperienceService: PersonelUserCvWorkExperienceService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
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
        this.getAllPersonelUsers(response);
        this.getPersonelUserCvWorkExperiences(response);
      },
      (responseError) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getPersonelUserCvWorkExperiences(adminModel: AdminModel) {
    this.personelUserCvWorkExperienceService
      .getDeletedAllDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserCvWorkExperienceDTOs = response.data;
        },
        (responseError) => console.error
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
        (responseError) => console.error
      );
  }

  unDeleteAll() {
    this.personelUserCvWorkExperienceDTOs.forEach(
      (personelUserCvWorkExperienceDTO) => {
        this.personelUserCvWorkExperienceService
          .update(personelUserCvWorkExperienceDTO)
          .subscribe(
            (response) => {},
            (responseError) => console.error
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
            (responseError) => console.error
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
