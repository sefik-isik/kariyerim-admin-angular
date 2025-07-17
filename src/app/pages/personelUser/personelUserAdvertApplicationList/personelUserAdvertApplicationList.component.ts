import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserAdvertApplicationDTO } from '../../../models/dto/personelUserAdvertApplicationDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { FilterApplicationCompanyUserAdvertPipe } from '../../../pipes/filterApplicationCompanyUserAdvert.pipe';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserAdvertApplicationService } from '../../../services/personelUserAdvertApplication.service';

@Component({
  selector: 'app-personelUserAdvertApplicationList',
  templateUrl: './personelUserAdvertApplicationList.component.html',
  styleUrls: ['./personelUserAdvertApplicationList.component.css'],
  imports: [CommonModule, FormsModule, FilterApplicationCompanyUserAdvertPipe],
})
export class PersonelUserAdvertApplicationListComponent implements OnInit {
  @Input() personelUserDTO: PersonelUserDTO;
  personelUserAdvertApplicationDTOs: PersonelUserAdvertApplicationDTO[] = [];
  filter1: string = '';
  componentTitle = 'Personel User Application Company User Adverts';

  constructor(
    private personelUserAdvertApplicationService: PersonelUserAdvertApplicationService,
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
    this.personelUserAdvertApplicationService
      .getAllByPersonelIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserAdvertApplicationDTOs = response.data;
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
  }

  terminate(
    personelUserAdvertApplicationDTO: PersonelUserAdvertApplicationDTO
  ) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserAdvertApplicationService
      .terminate(personelUserAdvertApplicationDTO)
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

    this.personelUserAdvertApplicationDTOs.forEach(
      (personelUserAdvertApplicationDTO) => {
        this.personelUserAdvertApplicationService
          .terminate(personelUserAdvertApplicationDTO)
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

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
