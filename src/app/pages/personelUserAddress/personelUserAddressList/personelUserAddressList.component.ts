import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { PersonelUserAddressDTO } from '../../../models/dto/personelUserAddressDTO';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { FilterPersonelUserAddressByUserPipe } from '../../../pipes/filterPersonelUserAddressByUser.pipe';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddressUpdateComponent } from '../personelUserAddressUpdate/personelUserAddressUpdate.component';
import { PersonelUserAddressDetailComponent } from '../personelUserAddressDetail/personelUserAddressDetail.component';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AuthService } from '../../../services/auth.service';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';

@Component({
  selector: 'app-personelUserAddressList',
  templateUrl: './personelUserAddressList.component.html',
  styleUrls: ['./personelUserAddressList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserAddressByUserPipe],
})
export class PersonelUserAddressListComponent implements OnInit {
  personelUserAddressDTOs: PersonelUserAddressDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Addresses';

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService
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
        this.getPersonelUsers(response);
        this.getPersonelAddresses(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getPersonelUsers(adminModel: AdminModel) {
    this.personelUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getPersonelAddresses(adminModel: AdminModel) {
    this.personelUserAddressService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserAddressDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(personelUserAddressDTO: PersonelUserAddressDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserAddressService.delete(personelUserAddressDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserAddressDTOs.forEach((personelUserAddressDTO) => {
      this.personelUserAddressService.delete(personelUserAddressDTO).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(personelUserAddressDTO: PersonelUserAddressDTO) {
    const modalRef = this.modalService.open(
      PersonelUserAddressUpdateComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.personelUserAddressDTO = personelUserAddressDTO;
  }

  openDetail(personelUserAddressDTO: PersonelUserAddressDTO) {
    const modalRef = this.modalService.open(
      PersonelUserAddressDetailComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.personelUserAddressDTO = personelUserAddressDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
