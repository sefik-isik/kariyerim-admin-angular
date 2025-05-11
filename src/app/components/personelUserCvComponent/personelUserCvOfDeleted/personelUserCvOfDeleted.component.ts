import { LocalStorageService } from './../../../services/localStorage.service';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { FilterPersonelUserCvByUserPipe } from '../../../pipes/filterPersonelUserCvByUser.pipe';

import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { PersonelUserCode } from '../../../models/userCodes';
import { PersonelUserService } from '../../../services/personelUser.service';

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
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getAdminValues();
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
    this.personelUserCvService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvDTOs = response.data;
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
    this.getAdminValues();
  }
}
