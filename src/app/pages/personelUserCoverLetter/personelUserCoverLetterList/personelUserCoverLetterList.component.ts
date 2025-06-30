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

@Component({
  selector: 'app-personelUserCoverLetterList',
  templateUrl: './personelUserCoverLetterList.component.html',
  styleUrls: ['./personelUserCoverLetterList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCoverLetterByUserPipe],
})
export class PersonelUserCoverLetterListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserCoverLetterDTOs: PersonelUserCoverLetterDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Personel User Cover Letters';
  userId: string;

  constructor(
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
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
        this.getPersonelUserCoverLetter(response);
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

  getPersonelUserCoverLetter(adminModel: AdminModel) {
    this.personelUserCoverLetterService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCoverLetterDTOs = response.data;
      },
      (responseError) => console.error
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
          this.toastrService.success('Başarı ile silindi');
          this.ngOnInit();
        },
        (responseError) => console.error
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
          (response) => {},
          (responseError) => console.error
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
