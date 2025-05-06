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
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserImageSlide',
  templateUrl: './companyUserImageSlide.component.html',
  styleUrls: ['./companyUserImageSlide.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserImageByUserPipe,

    CarouselModule,
  ],
})
export class CompanyUserImageSlideComponent implements OnInit {
  companyUserImageDTOs: CompanyUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  componentTitle = 'Company User Images Slide';
  userId: number;

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
        this.userDTOs = response.data.filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }
  getCompanyUserImages() {
    let userId: number;
    userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserImageService.getAllDTO(userId).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data.filter(
          (f) => f.code == CompanyUserCode
        );
      },
      (error) => console.error
    );
  }

  delete(companyUserImage: CompanyUserImageDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserImageService.delete(companyUserImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.getCompanyUserImages();
      },
      (error) => {
        console.error(error);
        if (error.error) {
          this.toastrService.error(error.error.message);
        } else {
          this.toastrService.error('Silme işlemi başarısız oldu');
        }
        this.getCompanyUserImages();
      }
    );
  }

  clearInput1() {
    this.filter1 = null;
    this.getCompanyUserImages();
  }
}
