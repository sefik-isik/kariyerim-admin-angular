import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserDTO } from '../../../models/personelUserDTO';
import { PersonelUserService } from '../../../services/personelUser.service';
import { PersonelUser } from '../../../models/personelUser';
import { FilterPersonelUserPipe } from '../../../pipes/filterPersonelUser.pipe';
import { PersonelUserCode } from '../../../models/userCodes';
import { BoolenTextPipe } from '../../../pipes/boolenText.pipe';
import { GenderPipe } from '../../../pipes/gender.pipe';

@Component({
  selector: 'app-personelUser',
  templateUrl: './personelUser.component.html',
  styleUrls: ['./personelUser.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterPersonelUserPipe,
    BoolenTextPipe,
    GenderPipe,
  ],
})
export class PersonelUserComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  personelUserDTOs: PersonelUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Personel Users';
  userId: number;

  constructor(
    private userService: UserService,
    private personelUserService: PersonelUserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getPersonelUsers();
  }

  getPersonelUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.personelUserService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.personelUserDTOs = response.data.filter(
          (f) => f.code == PersonelUserCode
        );
      },
      (error) => console.log(error)
    );
  }

  delete(personelUser: PersonelUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserService.delete(personelUser).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.personelUserDTOs.forEach((personelUserDTO) => {
      this.personelUserService.delete(personelUserDTO).subscribe(
        (response) => {},
        (error) => console.log(error)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
