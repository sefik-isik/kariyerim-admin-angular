import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserCvWorkExperienceDTO } from '../../../models/personelUserCvWorkExperienceDTO';
import { PersonelUserCvWorkExperienceService } from '../../../services/personelUserCvWorkExperience.service';
import { FilterPersonelUserCvWorkExperienceByUserPipe } from '../../../pipes/filterPersonelUserCvWorkExperienceByUser.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationUpdateComponent } from '../../personelUserCvEducation/personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { PersonelUserCvEducationDetailComponent } from '../../personelUserCvEducation/personelUserCvEducationDetail/personelUserCvEducationDetail.component';

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
  userDTOs: UserDTO[] = [];
  personelUserCvWorkExperienceDTOs: PersonelUserCvWorkExperienceDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Cv Work Experiences';
  userId: number;

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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserCvWorkExperiences(response);
      },
      (error) => console.error
    );
  }

  getAllPersonelUsers(adminModel: AdminModel) {
    this.userService.getAllPersonelUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getPersonelUserCvWorkExperiences(adminModel: AdminModel) {
    this.personelUserCvWorkExperienceService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvWorkExperienceDTOs = response.data;
      },
      (error) => console.error
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
        (error) => console.error
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
            (error) => console.error
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
      PersonelUserCvEducationUpdateComponent,
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
      PersonelUserCvEducationDetailComponent,
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
