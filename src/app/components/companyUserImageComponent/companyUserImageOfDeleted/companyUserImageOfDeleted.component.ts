import { LocalStorageService } from './../../../services/localStorage.service';
import { FilterCompanyUserImageByUserPipe } from '../../../pipes/filterCompanyUserImageByUser.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CompanyUserImageDTO } from '../../../models/companyUserImageDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';

import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserImageOfDeleted',
  templateUrl: './companyUserImageOfDeleted.component.html',
  styleUrls: ['./companyUserImageOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserImageByUserPipe,
  ],
})
export class CompanyUserImageOfDeletedComponent implements OnInit {
  companyUserImageDTOs: CompanyUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  componentTitle = 'Company User Images Of Deleted';
  userId: number;
  companyUserImagesLenght: number = 0;

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyUserImages();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCompanyUserImages() {
    let userId: number;
    userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserImageService.getAllDTO(userId).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data
          .filter((f) => f.deletedDate != null)
          .filter((f) => f.code == CompanyUserCode);
        this.companyUserImagesLenght = this.companyUserImageDTOs.length;
        this.dataLoaded = true;
      },
      (error) => console.error
    );
  }

  unDelete(companyUserImageDTO: CompanyUserImageDTO) {
    this.companyUserImageService.update(companyUserImageDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserImageDTOs.forEach((companyUserImageDTO) => {
      this.companyUserImageService.update(companyUserImageDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clear1Input1() {
    this.filter1 = null;
    this.getCompanyUserImages();
  }
}
