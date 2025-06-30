import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { FilterPersonelUserCvByUserPipe } from '../../../pipes/filterPersonelUserCvByUser.pipe';
import { PersonelUserCvDTO } from '../../../models/dto/personelUserCvDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvUpdateComponent } from '../personelUserCvUpdate/personelUserCvUpdate.component';
import { PersonelUserCvDetailComponent } from '../personelUserCvDetail/personelUserCvDetail.component';

@Component({
  selector: 'app-personelUserCvDeletedList',
  templateUrl: './personelUserCvDeletedList.component.html',
  styleUrls: ['./personelUserCvDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserCvByUserPipe],
})
export class PersonelUserCvDeletedListComponent implements OnInit {
  personelUserCvDTOs: PersonelUserCvDTO[] = [];
  personelUserCvDTO: PersonelUserCvDTO;
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Cvs Deleted List';
  userId: string;

  constructor(
    private personelUserCvService: PersonelUserCvService,
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
        this.getPersonelUserCvs(response);
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

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(personelUserCvDTO: PersonelUserCvDTO) {
    this.personelUserCvService.update(personelUserCvDTO).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => console.error
    );
  }

  unDeleteAll() {
    this.personelUserCvDTOs.forEach((personelUserCvDTO) => {
      this.personelUserCvService.update(personelUserCvDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(personelUserCvDTO: PersonelUserCvDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserCvService.terminate(personelUserCvDTO).subscribe(
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

    this.personelUserCvDTOs.forEach((personelUserCvDTO) => {
      this.personelUserCvService.terminate(personelUserCvDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(personelUserCvDTO: PersonelUserCvDTO) {
    const modalRef = this.modalService.open(PersonelUserCvUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserCvDTO = personelUserCvDTO;
  }

  openDetail(personelUserCvDTO: PersonelUserCvDTO) {
    const modalRef = this.modalService.open(PersonelUserCvDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
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
