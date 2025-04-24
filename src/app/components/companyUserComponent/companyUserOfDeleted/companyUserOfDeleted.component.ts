import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CompanyUserDTO } from '../../../models/companyUserDTO';

import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';

@Component({
  selector: 'app-companyUserOfDeleted',
  templateUrl: './companyUserOfDeleted.component.html',
  styleUrls: ['./companyUserOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterUserPipe],
})
export class CompanyUserOfDeletedComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Company Users Of Deleted';
  userId: number;

  constructor(
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
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
        if (userId) {
          this.companyUserDTOs = response.data
            .filter((f) => f.companyUserId == userId)
            .filter((f) => f.deletedDate != null);
        } else {
          this.companyUserDTOs = response.data.filter(
            (f) => f.deletedDate != null
          );
        }
      },
      (error) => console.log(error)
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.find(
      (c) => c.email.toLowerCase() === userEmail.toLowerCase()
    )?.id;

    return userId;
  }

  unDelete(companyUser: CompanyUserDTO) {
    this.companyUserService.update(companyUser).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.update(companyUser).subscribe(
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
    this.getCompanyUsers();
  }
}
