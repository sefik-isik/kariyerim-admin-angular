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

@Component({
  selector: 'app-personelUserAddressList',
  templateUrl: './personelUserAddressList.component.html',
  styleUrls: ['./personelUserAddressList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserAddressByUserPipe],
})
export class PersonelUserAddressListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserAddressDTOs: PersonelUserAddressDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Addresses';
  userId: string;

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
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
        this.getPersonelAddresses(response);
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

  getPersonelAddresses(adminModel: AdminModel) {
    this.personelUserAddressService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserAddressDTOs = response.data;
      },
      (responseError) => console.error
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
      (responseError) => console.error
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
        (responseError) => console.error
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
        keyboard: false,
        centered: true,
        scrollable: true,
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
