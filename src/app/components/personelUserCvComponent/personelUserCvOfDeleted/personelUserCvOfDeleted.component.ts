import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { FilterPersonelUserCvByUserPipe } from '../../../pipes/filterPersonelUserCvByUser.pipe';

import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { PersonelUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-personelUserCvOfDeleted',
  templateUrl: './personelUserCvOfDeleted.component.html',
  styleUrls: ['./personelUserCvOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserCvByUserPipe,
  ],
})
export class PersonelUserCvOfDeletedComponent implements OnInit {
  personelUserCvDTOs: PersonelUserCvDTO[] = [];
  personelUserCvDTO: PersonelUserCvDTO;
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  componentTitle = 'Personel User Cvs Of Deleted';
  userId: number;

  constructor(
    private personelUserCvService: PersonelUserCvService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();

    this.getPersonelUserCvs();
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

  getPersonelUserCvs() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.personelUserCvService.getAllDeletedDTO(this.userId).subscribe(
      (response) => {
        this.personelUserCvDTOs = response.data.filter(
          (f) => f.code == PersonelUserCode
        );
      },
      (error) => console.error
    );
  }

  unDelete(personelUserCvDTO: PersonelUserCvDTO) {
    this.personelUserCvService.update(personelUserCvDTO).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.personelUserCvDTOs.forEach((personelUserCvDTO) => {
      this.personelUserCvService.update(personelUserCvDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getPersonelUserCvs();
  }
}
