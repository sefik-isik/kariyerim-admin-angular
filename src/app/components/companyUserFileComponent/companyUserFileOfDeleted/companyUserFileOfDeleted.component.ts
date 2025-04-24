import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserFileDTO } from '../../../models/companyUserFileDTO';
import { CompanyUserFileService } from '../../../services/companyUserFile.service';
import { FilterCompanyUserFileByUserPipe } from '../../../pipes/filterCompanyUserFileByUser.pipe';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-companyUserFileOfDeleted',
  templateUrl: './companyUserFileOfDeleted.component.html',
  styleUrls: ['./companyUserFileOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserFileByUserPipe,
  ],
})
export class CompanyUserFileOfDeletedComponent implements OnInit {
  companyUserFileDTOs: CompanyUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  componentTitle = 'Company User Files Of Deleted';
  userId: number;

  constructor(
    private companyUserFileService: CompanyUserFileService,
    private toastrService: ToastrService,
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
        this.userDTOs = response.data.filter((f) => f.deletedDate == null);
      },
      (error) => console.error
    );
  }

  getCompanyUserFiles() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserFileService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUserFileDTOs = response.data.filter(
          (f) => f.deletedDate != null
        );
        this.dataLoaded = true;
      },
      (error) => console.error
    );
  }

  unDelete(companyUserFileDTO: CompanyUserFileDTO) {
    this.companyUserFileService.update(companyUserFileDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserFileDTOs.forEach((companyUserFileDTO) => {
      this.companyUserFileService.update(companyUserFileDTO).subscribe(
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
    this.getCompanyUserFiles();
  }
}
