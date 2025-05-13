import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserCoverLetter } from '../../../models/personelUserCoverLetter';
import { PersonelUserCoverLetterService } from '../../../services/personelUserCoverLetter.service';
import { FilterPersonelUserCoverLetterByUserPipe } from '../../../pipes/filterPersonelUserCoverLetterByUser.pipe';
import { PersonelUserCoverLetterDTO } from '../../../models/PersonelUserCoverLetterDTO';

@Component({
  selector: 'app-personelUserCoverLetterDeletedList',
  templateUrl: './personelUserCoverLetterDeletedList.component.html',
  styleUrls: ['./personelUserCoverLetterDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserCoverLetterByUserPipe,
  ],
})
export class PersonelUserCoverLetterDeletedListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserCoverLetterDTOs: PersonelUserCoverLetterDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Personel User Cover Letters';
  userId: number;

  constructor(
    private personelUserCoverLetterService: PersonelUserCoverLetterService,
    private toastrService: ToastrService,
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
        this.getPersonelUserCoverLetter(response);
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

  getPersonelUserCoverLetter(adminModel: AdminModel) {
    this.personelUserCoverLetterService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCoverLetterDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(personelUserCoverLetter: PersonelUserCoverLetter) {
    this.personelUserCoverLetterService
      .update(personelUserCoverLetter)
      .subscribe(
        (response) => {
          this.toastrService.success('Başarı ile silindi');
          this.ngOnInit();
        },
        (error) => console.error
      );
  }

  unDeleteAll() {
    this.personelUserCoverLetterDTOs.forEach((personelUserCoverLetterDTO) => {
      this.personelUserCoverLetterService
        .update(personelUserCoverLetterDTO)
        .subscribe(
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
    this.getAdminValues();
  }
}
