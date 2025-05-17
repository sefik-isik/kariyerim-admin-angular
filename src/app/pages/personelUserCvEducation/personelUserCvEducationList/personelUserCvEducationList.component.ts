import { PersonelUserCvEducationDTO } from './../../../models/personelUserCvEducationDTO';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserCvEducationService } from '../../../services/personelUserCvEducation.service';
import { FilterPersonelUserCvEducationByUserPipe } from '../../../pipes/filterPersonelUserCvEducationByUser.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationUpdateComponent } from '../personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { PersonelUserCvEducationDetailComponent } from '../personelUserCvEducationDetail/personelUserCvEducationDetail.component';

@Component({
  selector: 'app-personelUserCvEducationList',
  templateUrl: './personelUserCvEducationList.component.html',
  styleUrls: ['./personelUserCvEducationList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCvEducationByUserPipe],
})
export class PersonelUserCvEducationListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserCvEducationDTOs: PersonelUserCvEducationDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Cv Educations';
  userId: number;

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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserCvEducations(response);
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

  getPersonelUserCvEducations(adminModel: AdminModel) {
    this.personelUserCvEducationService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvEducationDTOs = response.data;
      },
      (error) => console.error
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
    this.personelUserCvEducationDTOs.forEach((personelUserCvEducationDTO) => {
      this.personelUserCvEducationService
        .delete(personelUserCvEducationDTO)
        .subscribe(
          (response) => {},
          (error) => console.error
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
