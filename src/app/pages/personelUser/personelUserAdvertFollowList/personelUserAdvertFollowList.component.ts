import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserAdvertFollowDTO } from '../../../models/dto/personelUserAdvertFollowDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserAdvertFollowService } from '../../../services/personelUserAdvertFollow.service';
import { FilterFollowCompanyUserAdvertPipe } from '../../../pipes/filterFollowCompanyUserAdvert.pipe';

@Component({
  selector: 'app-personelUserAdvertFollowList',
  templateUrl: './personelUserAdvertFollowList.component.html',
  styleUrls: ['./personelUserAdvertFollowList.component.css'],
  imports: [CommonModule, FormsModule, FilterFollowCompanyUserAdvertPipe],
})
export class PersonelUserAdvertFollowListComponent implements OnInit {
  @Input() personelUserDTO: PersonelUserDTO;
  personelUserAdvertFollowDTOs: PersonelUserAdvertFollowDTO[] = [];
  filter1: string = '';
  componentTitle = 'Personel User Follow Company User Adverts';

  constructor(
    private personelUserAdvertFollowService: PersonelUserAdvertFollowService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private localStorageService: LocalStorageService,
    private adminService: AdminService,
    private toastrService: ToastrService
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
        this.getPersonelUserAdvertFollows(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getPersonelUserAdvertFollows(adminModel: AdminModel) {
    adminModel.id = this.personelUserDTO.id;
    this.personelUserAdvertFollowService
      .getAllByPersonelIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserAdvertFollowDTOs = response.data;
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
  }

  terminate(personelUserAdvertFollowDTO: PersonelUserAdvertFollowDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserAdvertFollowService
      .terminate(personelUserAdvertFollowDTO)
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

    this.personelUserAdvertFollowDTOs.forEach((personelUserAdvertFollowDTO) => {
      this.personelUserAdvertFollowService
        .terminate(personelUserAdvertFollowDTO)
        .subscribe(
          (response) => {},
          (responseError) =>
            this.toastrService.error(responseError.error.message)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
