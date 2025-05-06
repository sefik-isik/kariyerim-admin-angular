import { LocalStorageService } from './../../../services/localStorage.service';
import { CompanyUserFileService } from './../../../services/companyUserFile.service';
import { FilterCompanyUserFileByUserPipe } from '../../../pipes/filterCompanyUserFileByUser.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CompanyUserFile } from '../../../models/companyUserFile';
import { CompanyUserFileDTO } from '../../../models/companyUserFileDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserFile',
  templateUrl: './companyUserFile.component.html',
  styleUrls: ['./companyUserFile.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserFileByUserPipe,
  ],
})
export class CompanyUserFileComponent implements OnInit {
  companyUserFileDTOS: CompanyUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  componentTitle = 'Company User Files';
  userId: number;

  constructor(
    private toastrService: ToastrService,
    private companyUserFileService: CompanyUserFileService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyUserFiles();
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

  getCompanyUserFiles() {
    let userId: number;
    userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserFileService.getAllDTO(userId).subscribe(
      (response) => {
        this.companyUserFileDTOS = response.data.filter(
          (f) => f.code == CompanyUserCode
        );
      },
      (error) => console.error
    );
  }

  delete(companyUserFile: CompanyUserFile) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserFileService.delete(companyUserFile).subscribe(
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
    this.companyUserFileDTOS.forEach((companyUserFile) => {
      this.companyUserFileService.delete(companyUserFile).subscribe(
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
    this.getCompanyUserFiles();
  }
}
