import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminModel } from '../../../models/auth/adminModel';
import { PrivatePipe } from '../../../pipes/private.pipe';
import { AdminService } from '../../../services/helperServices/admin.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PersonelUserCvDTO } from '../../../models/dto/personelUserCvDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterPersonelUserCvByUserPipe } from '../../../pipes/filterPersonelUserCvByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { PersonelUserCvDetailComponent } from '../personelUserCvDetail/personelUserCvDetail.component';
import { PersonelUserCvUpdateComponent } from '../personelUserCvUpdate/personelUserCvUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserCvList',
  templateUrl: './personelUserCvList.component.html',
  styleUrls: ['./personelUserCvList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterPersonelUserCvByUserPipe,
    PrivatePipe,
  ],
})
export class PersonelUserCvListComponent implements OnInit {
  personelUserCvDTOs: PersonelUserCvDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Cvs';

  constructor(
    private personelUserCvService: PersonelUserCvService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
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
        this.validationService.handleSuccesses(response);
        this.getPersonelUsers(response);
        this.getPersonelUserCvs(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserCvDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(personelUserCv: PersonelUserCvDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvService.delete(personelUserCv).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
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
    this.personelUserCvDTOs.forEach((personelUserCvDTO) => {
      this.personelUserCvService.delete(personelUserCvDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(personelUserCvDTO: PersonelUserCvDTO) {
    const modalRef = this.modalService.open(PersonelUserCvUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserCvDTO = personelUserCvDTO;
  }

  openDetail(personelUserCvDTO: PersonelUserCvDTO) {
    const modalRef = this.modalService.open(PersonelUserCvDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserCvDTO = personelUserCvDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
