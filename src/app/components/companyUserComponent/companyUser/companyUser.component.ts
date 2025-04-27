import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserService } from '../../../services/companyUser.service';

import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { CompanyUser } from '../../../models/companyUser';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';

@Component({
  selector: 'app-companyUser',
  templateUrl: './companyUser.component.html',
  styleUrls: ['./companyUser.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterUserPipe],
})
export class CompanyUserComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Company Users';
  userId: number;

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyUsers();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getCompanyUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));
    const userId = this.getUserId(this.filter1);
    this.companyUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUserDTOs = response.data.filter(
          (f) => f.deletedDate == null
        );
      },
      (error) => console.log(error)
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )[0]?.id;

    return userId;
  }

  delete(companyUser: CompanyUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserService.delete(companyUser).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.delete(companyUser).subscribe(
        (response) => {},
        (error) => console.log(error)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
