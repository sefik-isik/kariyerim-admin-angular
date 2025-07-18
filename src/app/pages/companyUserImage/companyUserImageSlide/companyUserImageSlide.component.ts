import { FilterCompanyUserImageByUserPipe } from '../../../pipes/filterCompanyUserImageByUser.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserImageDTO } from '../../../models/dto/companyUserImageDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserImageSlide',
  templateUrl: './companyUserImageSlide.component.html',
  styleUrls: ['./companyUserImageSlide.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterCompanyUserImageByUserPipe,
    CarouselModule,
  ],
})
export class CompanyUserImageSlideComponent implements OnInit {
  companyUserImageDTOs: CompanyUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Company User Images Slide';

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUserImages(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserImages(adminModel: AdminModel) {
    this.companyUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
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
      (responseError) => {
        this.validationService.handleErrors(responseError);
        if (responseError.error) {
          this.validationService.handleErrors(responseError);
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
