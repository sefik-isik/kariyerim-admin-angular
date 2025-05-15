import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { LocalStorageService } from '../../../services/localStorage.service';
import { PersonelUserFileDTO } from '../../../models/personelUserFileDTO';
import { PersonelUserFileService } from '../../../services/personelUserFile.service';
import { PersonelUserFile } from '../../../models/personelUserFile';
import { FilterPersonelUserFileByUserPipe } from '../../../pipes/filterPersonelUserFileByUser.pipe';

@Component({
  selector: 'app-personelUserFileList',
  templateUrl: './personelUserFileList.component.html',
  styleUrls: ['./personelUserFileList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserFileByUserPipe,
  ],
})
export class PersonelUserFileListComponent implements OnInit {
  personelUserFileDTOs: PersonelUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Personel User Files';
  userId: number;

  constructor(
    private toastrService: ToastrService,
    private personelUserFileService: PersonelUserFileService,
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
        this.getPersonelUserFiles(response);
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

  getPersonelUserFiles(adminModel: AdminModel) {
    this.personelUserFileService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.personelUserFileDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(personelUserFile: PersonelUserFile) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserFileService.delete(personelUserFile).subscribe(
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
    this.personelUserFileDTOs.forEach((personelUserFileDTO) => {
      this.personelUserFileService.delete(personelUserFileDTO).subscribe(
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
