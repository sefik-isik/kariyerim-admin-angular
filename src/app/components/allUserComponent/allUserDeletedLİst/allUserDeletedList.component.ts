import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterAllUserPipe } from '../../../pipes/filterAllUser.pipe';
import { CodePipe } from '../../../pipes/code.pipe';
import { StatusPipe } from '../../../pipes/status.pipe';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllUserDetailComponent } from '../allUserDetail/allUserDetail.component';
import { AllUserUpdateComponent } from '../allUserUpdate/allUserUpdate.component';
import { LocalStorageService } from '../../../services/localStorage.service';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-allUserDeletedList',
  templateUrl: './allUserDeletedList.component.html',
  styleUrls: ['./allUserDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterAllUserPipe, CodePipe, StatusPipe],
})
export class AllUserDeletedListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'All User Deleted List';
  userId: number;
  status: string;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private modalService: NgbModal,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getAdminValues();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
    this.status = this.localStorageService.getFromLocalStorage('status');
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getUsers(response);
      },
      (error) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
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
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.userDTOs.forEach((userDTO) => {
      userDTO.passwordHash = 'passwordHash';
      userDTO.passwordSalt = 'passwordSalt';
      this.authService.unDeleteUser(userDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  open(userDTO: UserDTO) {
    const modalRef = this.modalService.open(AllUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.userDTO = userDTO;
  }

  openDetail(userDTO: UserDTO) {
    const modalRef = this.modalService.open(AllUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.userDTO = userDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
