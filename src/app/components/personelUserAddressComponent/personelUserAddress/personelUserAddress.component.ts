import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserCode } from '../../../models/userCodes';
import { PersonelUserAddressDTO } from '../../../models/personelUserAddressDTO';
import { PersonelUserAddressService } from '../../../services/personelUserAddress.service';
import { FilterPersonelUserAddressByUserPipe } from '../../../pipes/filterPersonelUserAddressByUser.pipe';

@Component({
  selector: 'app-personelUserAddress',
  templateUrl: './personelUserAddress.component.html',
  styleUrls: ['./personelUserAddress.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserAddressByUserPipe,
  ],
})
export class PersonelUserAddressComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserAddressDTOs: PersonelUserAddressDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Personel User Addresses';
  userId: number;

  constructor(
    private personelUserAddressService: PersonelUserAddressService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getPersonelAddresses();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data.filter((f) => f.code == PersonelUserCode);
      },
      (error) => console.error
    );
  }

  getPersonelAddresses() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.personelUserAddressService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.personelUserAddressDTOs = response.data.filter(
          (f) => f.code == PersonelUserCode
        );
      },
      (error) => console.error
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
      (error) => console.error
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
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getPersonelAddresses();
  }
}
