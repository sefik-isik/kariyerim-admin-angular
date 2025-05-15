import { LocalStorageService } from './../../../services/localStorage.service';
import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { FilterPersonelUserImageByUserPipe } from '../../../pipes/FilterPersonelUserImageByUser.pipe';
import { PersonelUserImageDTO } from '../../../models/personelUserImageDTO';
import { PersonelUserImageService } from '../../../services/personelUserImage.service';

@Component({
  selector: 'app-personelUserImageDeletedList',
  templateUrl: './personelUserImageDeletedList.component.html',
  styleUrls: ['./personelUserImageDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserImageByUserPipe,
  ],
})
export class PersonelUserImageDeletedListComponent implements OnInit {
  personelUserImageDTOs: PersonelUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Images Deleted List';
  userId: number;
  personelUserImagesLenght: number = 0;

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
    this.personelUserImageService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.personelUserImageDTOs = response.data;
        this.personelUserImagesLenght = this.personelUserImageDTOs.length;
      },
      (error) => console.error
    );
  }

  unDelete(personelUserImageDTO: PersonelUserImageDTO) {
    this.personelUserImageService.update(personelUserImageDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.personelUserImageDTOs.forEach((personelUserImageDTO) => {
      this.personelUserImageService.update(personelUserImageDTO).subscribe(
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
    this.getAdminValues();
  }
}
