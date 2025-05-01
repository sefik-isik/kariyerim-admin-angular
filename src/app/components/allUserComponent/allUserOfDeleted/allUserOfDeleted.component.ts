import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { PersonelUserCode } from '../../../models/userCodes';
import { FilterAllUserPipe } from '../../../pipes/filterAllUser.pipe';
import { CodePipe } from '../../../pipes/code.pipe';
import { StatusPipe } from '../../../pipes/status.pipe';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-allUserOfDeleted',
  templateUrl: './allUserOfDeleted.component.html',
  styleUrls: ['./allUserOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterAllUserPipe,
    CodePipe,
    StatusPipe,
  ],
})
export class AllUserOfDeletedComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Deleted All Users';
  userId: number;
  status: string;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.status = this.localStorageService.getFromLocalStorage('status');
  }

  //allUsersComponent
  //updateCode
  //updateStatus

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data.filter((f) => f.deletedDate != null);
      },
      (error) => console.error
    );
  }

  unDelete(userDTO: UserDTO) {
    userDTO.passwordHash = 'passwordHash';
    userDTO.passwordSalt = 'passwordSalt';
    this.authService.unDeleteUser(userDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }

  unDeleteAll() {
    this.userDTOs.forEach((userDTO) => {
      userDTO.passwordHash = 'passwordHash';
      userDTO.passwordSalt = 'passwordSalt';
      this.authService.unDeleteUser(userDTO).subscribe(
        (response) => {},
        (error) => console.log(error)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
