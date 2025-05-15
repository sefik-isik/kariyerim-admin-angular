import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserImageDTO } from '../../../models/personelUserImageDTO';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';
import { FilterPersonelUserImageByUserPipe } from '../../../pipes/FilterPersonelUserImageByUser.pipe';

@Component({
  selector: 'app-personelUserImageList',
  templateUrl: './personelUserImageList.component.html',
  styleUrls: ['./personelUserImageList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserImageByUserPipe,
  ],
})
export class PersonelUserImageListComponent implements OnInit {
  personelUserImageDTOs: PersonelUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Images';
  userId: number;

  personelUserImagesLenght: number = 0;

  constructor(
    private toastrService: ToastrService,
    private personelUserImageService: PersonelUserImageService,
    private userService: UserService,
    private adminService: AdminService,
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
        this.personelUserImagesLenght = this.personelUserImageDTOs.length;
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
    this.personelUserImageDTOs.forEach((personelUserImageDTO) => {
      this.personelUserImageService.delete(personelUserImageDTO).subscribe(
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
    this.getAdminValues();
  }
}
