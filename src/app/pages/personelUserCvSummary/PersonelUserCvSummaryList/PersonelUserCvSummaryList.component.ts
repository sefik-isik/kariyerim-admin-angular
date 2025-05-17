import { FilterPersonelUserCvSummaryByUserPipe } from '../../../pipes/filterPersonelUserCvSummaryByUser.pipe';
import { AdminModel } from '../../../models/adminModel';
import { AdminService } from '../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserCvSummary } from '../../../models/personelUserCvSummary';
import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { PersonelUserCvSummaryDTO } from '../../../models/personelUserCvSummaryDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvEducationUpdateComponent } from '../../personelUserCvEducation/personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { PersonelUserCvEducationDetailComponent } from '../../personelUserCvEducation/personelUserCvEducationDetail/personelUserCvEducationDetail.component';

@Component({
  selector: 'app-personelUserCvSummaryList',
  templateUrl: './personelUserCvSummaryList.component.html',
  styleUrls: ['./personelUserCvSummaryList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCvSummaryByUserPipe],
})
export class PersonelUserCvSummaryListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserCvSummaryDTOs: PersonelUserCvSummaryDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Cv Summaries';
  userId: number;

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
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
        this.getPersonelUserCvSummaries(response);
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

  getPersonelUserCvSummaries(adminModel: AdminModel) {
    this.personelUserCvSummaryService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvSummaryDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(PersonelUserCvSummaries: PersonelUserCvSummary) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvSummaryService.delete(PersonelUserCvSummaries).subscribe(
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
    this.personelUserCvSummaryDTOs.forEach((personelUserCvSummaryDTO) => {
      this.personelUserCvSummaryService
        .delete(personelUserCvSummaryDTO)
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

  open(personelUserCvSummaryDTO: PersonelUserCvSummaryDTO) {
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
    modalRef.componentInstance.personelUserCvSummaryDTO =
      personelUserCvSummaryDTO;
  }

  openDetail(personelUserCvSummaryDTO: PersonelUserCvSummaryDTO) {
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
    modalRef.componentInstance.personelUserCvSummaryDTO =
      personelUserCvSummaryDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
