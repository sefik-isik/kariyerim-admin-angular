import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminService } from '../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { AdminModel } from '../../../models/adminModel';
import { PersonelUserAddressDTO } from '../../../models/personelUserAddressDTO';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { FilterPersonelUserAddressByUserPipe } from '../../../pipes/filterPersonelUserAddressByUser.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddressUpdateComponent } from '../personelUserAddressUpdate/personelUserAddressUpdate.component';
import { PersonelUserAddressDetailComponent } from '../personelUserAddressDetail/personelUserAddressDetail.component';

@Component({
  selector: 'app-personelUserAddressDeletedList',
  templateUrl: './personelUserAddressDeletedList.component.html',
  styleUrls: ['./personelUserAddressDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserAddressByUserPipe],
})
export class PersonelUserAddressDeletedListComponent implements OnInit {
  personelUserAddressDTOs: PersonelUserAddressDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Deleted Personel User Addresses';
  userId: number;

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
    private toastrService: ToastrService,
    private userService: UserService,
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
        this.getPersonelUserAddresses(response);
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

  getPersonelUserAddresses(adminModel: AdminModel) {
    this.personelUserAddressService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.personelUserAddressDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(personelUserAddressDTO: PersonelUserAddressDTO) {
    this.personelUserAddressService.update(personelUserAddressDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.personelUserAddressDTOs.forEach((personelUserAddressDTO) => {
      this.personelUserAddressService.update(personelUserAddressDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
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
