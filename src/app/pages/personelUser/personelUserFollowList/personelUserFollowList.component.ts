import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserFollowCompanyUserDTO } from '../../../models/dto/personelUserFollowCompanyUserDTO';
import { FilterFollowCompanyByCompanyUserPipe } from '../../../pipes/filterFollowCompanyByCompanyUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserFollowCompanyUserService } from '../../../services/personelUserFollowCompanyUser.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';

@Component({
  selector: 'app-personelUserFollowList',
  templateUrl: './personelUserFollowList.component.html',
  styleUrls: ['./personelUserFollowList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterFollowCompanyByCompanyUserPipe,
    CommonModule,
  ],
})
export class PersonelUserFollowListComponent implements OnInit {
  @Input() personelUserDTO: PersonelUserDTO;
  personelUserFollowCompanyUserDTOs: PersonelUserFollowCompanyUserDTO[] = [];
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Personel User Follow Company Users';

  constructor(
    private personelUserFollowCompanyUserService: PersonelUserFollowCompanyUserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService,
    public activeModal: NgbActiveModal
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
        this.getPersonelUserFollowCompanyUsers(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getPersonelUserFollowCompanyUsers(adminModel: AdminModel) {
    this.personelUserFollowCompanyUserService
      .getAllByPersonelIdDTO(adminModel)
      .subscribe(
        (response) => {
          this.personelUserFollowCompanyUserDTOs = response.data.filter(
            (f) => f.personelUserId == this.personelUserDTO.id
          );
        },
        (responseError) => console.log(responseError)
      );
  }

  terminate(
    personelUserFollowCompanyUserDTO: PersonelUserFollowCompanyUserDTO
  ) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserFollowCompanyUserService
      .terminate(personelUserFollowCompanyUserDTO)
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

    this.personelUserFollowCompanyUserDTOs.forEach(
      (personelUserFollowCompanyUser) => {
        this.personelUserFollowCompanyUserService
          .terminate(personelUserFollowCompanyUser)
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
