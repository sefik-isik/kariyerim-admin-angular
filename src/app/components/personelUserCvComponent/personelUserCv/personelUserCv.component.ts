import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserCvService } from '../../../services/personelUserCv.service';
import { FilterPersonelUserCvByUserPipe } from '../../../pipes/filterPersonelUserCvByUser.pipe';
import { PersonelUserCvDTO } from '../../../models/personelUserCvDTO';
import { PersonelUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-personelUserCv',
  templateUrl: './personelUserCv.component.html',
  styleUrls: ['./personelUserCv.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserCvByUserPipe,
  ],
})
export class PersonelUserCvComponent implements OnInit {
  personelUserCvDTOs: PersonelUserCvDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  userId: number;
  componentTitle = 'Personel User Cvs';

  constructor(
    private personelUserCvService: PersonelUserCvService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getPersonelUserCvs();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data.filter((f) => f.code == PersonelUserCode);
      },
      (error) => console.error
    );
  }

  getPersonelUserCvs() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.personelUserCvService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.personelUserCvDTOs = response.data.filter(
          (f) => f.code == PersonelUserCode
        );
      },
      (error) => console.error
    );
  }

  delete(personelUserCv: PersonelUserCvDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.personelUserCvService.delete(personelUserCv).subscribe(
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
    this.personelUserCvDTOs.forEach((personelUserCvDTO) => {
      this.personelUserCvService.delete(personelUserCvDTO).subscribe(
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
    this.getPersonelUserCvs();
  }
}
