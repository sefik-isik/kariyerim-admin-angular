import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminModel } from '../../../models/auth/adminModel';
import { PersonelUserAddressDTO } from '../../../models/dto/personelUserAddressDTO';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { FilterPersonelUserAddressByUserPipe } from '../../../pipes/filterPersonelUserAddressByUser.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserAddressUpdateComponent } from '../personelUserAddressUpdate/personelUserAddressUpdate.component';
import { PersonelUserAddressDetailComponent } from '../personelUserAddressDetail/personelUserAddressDetail.component';
import { PersonelUserDTO } from '../../../models/dto/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-personelUserAddressDeletedList',
  templateUrl: './personelUserAddressDeletedList.component.html',
  styleUrls: ['./personelUserAddressDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPersonelUserAddressByUserPipe],
})
export class PersonelUserAddressDeletedListComponent implements OnInit {
  personelUserAddressDTOs: PersonelUserAddressDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  isPersonelUser: boolean = true;
  componentTitle = 'Personel User Addresses';

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
    private toastrService: ToastrService,
    private personelUserService: PersonelUserService,
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
        this.getPersonelUserAddresses(response);
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

  getPersonelUserAddresses(adminModel: AdminModel) {
    this.personelUserAddressService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.personelUserAddressDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(personelUserAddressDTO: PersonelUserAddressDTO) {
    this.personelUserAddressService.update(personelUserAddressDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.personelUserAddressDTOs.forEach((personelUserAddressDTO) => {
      this.personelUserAddressService.update(personelUserAddressDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(personelUserAddressDTO: PersonelUserAddressDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserAddressService.terminate(personelUserAddressDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserAddressDTOs.forEach((personelUserAddressDTO) => {
      this.personelUserAddressService
        .terminate(personelUserAddressDTO)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
