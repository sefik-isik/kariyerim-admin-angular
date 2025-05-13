import { FilterPersonelUserCvSummaryByUserPipe } from './../../../pipes/filterPersonelUserCvSummaryByUser.pipe';
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
import { PersonelUserCvSummary } from '../../../models/personelUserCvSummary';
import { PersonelUserCvSummaryService } from '../../../services/personelUserCvSummary.service';
import { PersonelUserCvSummaryDTO } from '../../../models/personelUserCvSummaryDTO';

@Component({
  selector: 'app-PersonelUserCvSummaryList',
  templateUrl: './PersonelUserCvSummaryList.component.html',
  styleUrls: ['./PersonelUserCvSummaryList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserCvSummaryByUserPipe,
  ],
})
export class PersonelUserCvSummaryListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserCvSummaryDTOs: PersonelUserCvSummaryDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Personel User Cv Summaries';
  userId: number;

  constructor(
    private personelUserCvSummaryService: PersonelUserCvSummaryService,
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
        this.getPersonelUserCvSummaries(response);
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

  getPersonelUserCvSummaries(adminModel: AdminModel) {
    this.personelUserCvSummaryService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserCvSummaryDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(PersonelUserCvSummaries: PersonelUserCvSummary) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvSummaryService.delete(PersonelUserCvSummaries).subscribe(
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
    this.personelUserCvSummaryDTOs.forEach((personelUserCvSummaryDTO) => {
      this.personelUserCvSummaryService
        .delete(personelUserCvSummaryDTO)
        .subscribe(
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
