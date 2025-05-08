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
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';

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
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUserImages(response);
      },
      (error) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUserImages(adminModel: AdminModel) {
    this.companyUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data;
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
