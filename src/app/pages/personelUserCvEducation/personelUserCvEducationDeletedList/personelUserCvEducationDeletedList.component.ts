import { PersonelUserCvEducationDTO } from '../../../models/dto/personelUserCvEducationDTO';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { FilterPersonelUserCvEducationByUserPipe } from '../../../pipes/filterPersonelUserCvEducationByUser.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationUpdateComponent } from '../personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { PersonelUserCvEducationDetailComponent } from '../personelUserCvEducationDetail/personelUserCvEducationDetail.component';

@Component({
  selector: 'app-personelUserCvEducationDeletedList',
  templateUrl: './personelUserCvEducationDeletedList.component.html',
  styleUrls: ['./personelUserCvEducationDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCvEducationByUserPipe],
})
export class PersonelUserCvEducationDeletedListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserCvEducationDTOs: PersonelUserCvEducationDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Cv Educations';
  userId: string;

  constructor(
    private personelUserCvEducationService: PersonelUserCvEducationService,
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
        this.getPersonelUserCvEducations(response);
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

  getPersonelUserCvEducations(adminModel: AdminModel) {
    this.personelUserCvEducationService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvEducationDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
    this.personelUserCvEducationService
      .update(personelUserCvEducationDTO)
      .subscribe(
        (response) => {
          this.toastrService.success('Başarı ile geri alındı');
          this.ngOnInit();
        },
        (responseError) => console.error
      );
  }

  unDeleteAll() {
    this.personelUserCvEducationDTOs.forEach((personelUserCvEducationDTO) => {
      this.personelUserCvEducationService
        .update(personelUserCvEducationDTO)
        .subscribe(
          (response) => {},
          (responseError) => console.error
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserCvEducationService
      .terminate(personelUserCvEducationDTO)
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

    this.personelUserCvEducationDTOs.forEach((personelUserCvEducationDTO) => {
      this.personelUserCvEducationService
        .terminate(personelUserCvEducationDTO)
        .subscribe(
          (response) => {},
          (responseError) => console.error
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
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
    modalRef.componentInstance.personelUserCvEducationDTO =
      personelUserCvEducationDTO;
  }

  openDetail(personelUserCvEducationDTO: PersonelUserCvEducationDTO) {
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
    modalRef.componentInstance.personelUserCvEducationDTO =
      personelUserCvEducationDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
