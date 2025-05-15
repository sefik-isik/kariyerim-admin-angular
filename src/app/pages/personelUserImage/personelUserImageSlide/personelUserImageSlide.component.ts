import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { PersonelUserImageDTO } from '../../../models/personelUserImageDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { LocalStorageService } from '../../../services/localStorage.service';
import { FilterPersonelUserImageByUserPipe } from '../../../pipes/FilterPersonelUserImageByUser.pipe';

@Component({
  selector: 'app-personelUserImageSlide',
  templateUrl: './personelUserImageSlide.component.html',
  styleUrls: ['./personelUserImageSlide.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
  userId: number;

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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllPersonelUsers(response);
        this.getPersonelUserImages(response);
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

  getPersonelUserImages(adminModel: AdminModel) {
    this.personelUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserImageDTOs = response.data;
      },
      (error) => console.error
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
      (error) => {
        console.error(error);
        if (error.error) {
          this.toastrService.error(error.error.message);
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
