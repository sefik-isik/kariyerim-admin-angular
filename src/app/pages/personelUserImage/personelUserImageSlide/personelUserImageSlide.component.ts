import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PersonelUserImageDTO } from '../../../models/dto/personelUserImageDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { FilterPersonelUserImageByUserPipe } from '../../../pipes/FilterPersonelUserImageByUser.pipe';

@Component({
  selector: 'app-personelUserImageSlide',
  templateUrl: './personelUserImageSlide.component.html',
  styleUrls: ['./personelUserImageSlide.component.css'],
  imports: [
    CommonModule,
    FormsModule,

    FilterPersonelUserImageByUserPipe,

    CarouselModule,
  ],
})
export class PersonelUserImageSlideComponent implements OnInit {
  personelUserImageDTOs: PersonelUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Images Slide';
  userId: string;

  constructor(
    private toastrService: ToastrService,
    private personelUserImageService: PersonelUserImageService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserImages(response);
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

  getPersonelUserImages(adminModel: AdminModel) {
    this.personelUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserImageDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  delete(personelUserImage: PersonelUserImageDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserImageService.delete(personelUserImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.getAdminValues();
      },
      (responseError) => {
        console.error(responseError);
        if (responseError.error) {
          this.toastrService.error(responseError.error.message);
        } else {
          this.toastrService.error('Silme işlemi başarısız oldu');
        }
        this.getAdminValues();
      }
    );
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
