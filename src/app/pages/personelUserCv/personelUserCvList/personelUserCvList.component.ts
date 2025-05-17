import { PrivatePipe } from '../../../pipes/private.pipe';
import { AdminModel } from '../../../models/adminModel';
import { AdminService } from '../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { FilterPersonelUserCvByUserPipe } from '../../../pipes/filterPersonelUserCvByUser.pipe';
import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvUpdateComponent } from '../personelUserCvUpdate/personelUserCvUpdate.component';
import { PersonelUserCvDetailComponent } from '../personelUserCvDetail/personelUserCvDetail.component';

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
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  userId: number;

  componentTitle = 'Personel User Cvs';

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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserCvs(response);
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

  getPersonelUserCvs(adminModel: AdminModel) {
    this.personelUserCvService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(personelUserCv: PersonelUserCvDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvService.delete(personelUserCv).subscribe(
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
    this.personelUserCvDTOs.forEach((personelUserCvDTO) => {
      this.personelUserCvService.delete(personelUserCvDTO).subscribe(
        (response) => {},
        (error) => console.error
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
