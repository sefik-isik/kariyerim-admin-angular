import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminModel } from '../../../models/adminModel';
import { AdminService } from '../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUser } from '../../../models/personelUser';
import { FilterPersonelUserPipe } from '../../../pipes/filterPersonelUser.pipe';
import { BoolenTextPipe } from '../../../pipes/boolenText.pipe';
import { GenderPipe } from '../../../pipes/gender.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserUpdateComponent } from '../personelUserUpdate/personelUserUpdate.component';
import { PersonelUserDetailComponent } from '../personelUserDetail/personelUserDetail.component';

@Component({
  selector: 'app-personelUserList',
  templateUrl: './personelUserList.component.html',
  styleUrls: ['./personelUserList.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterPersonelUserPipe,
    BoolenTextPipe,
    GenderPipe,
  ],
})
export class PersonelUserListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel Users';
  userId: number;

  constructor(
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
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
        this.getPersonelUsers(response);
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

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(personelUser: PersonelUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserService.delete(personelUser).subscribe(
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

    this.personelUserDTOs.forEach((personelUserDTO) => {
      this.personelUserService.delete(personelUserDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  openDetail(personelUserDTO: PersonelUserDTO) {
    const modalRef = this.modalService.open(PersonelUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.personelUserDTO = personelUserDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
