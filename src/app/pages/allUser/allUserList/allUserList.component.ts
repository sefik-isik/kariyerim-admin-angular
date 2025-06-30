import { AdminService } from '../../../services/helperServices/admin.service';
import { AllUserDetailComponent } from './../allUserDetail/allUserDetail.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterAllUserPipe } from '../../../pipes/filterAllUser.pipe';
import { CodePipe } from '../../../pipes/code.pipe';
import { StatusPipe } from '../../../pipes/status.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllUserUpdateComponent } from '../allUserUpdate/allUserUpdate.component';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allUserList',
  templateUrl: './allUserList.component.html',
  styleUrls: ['./allUserList.component.css'],
  imports: [CommonModule, FormsModule, FilterAllUserPipe, CodePipe, StatusPipe],
})
export class AllUserListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'All Users';
  userId: string;
  status: string;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getUsers(response);
      },
      (responseError) => console.error
    );
  }

  getUsers(adminModel: AdminModel) {
    this.userService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.log(responseError)
    );
  }

  delete(userDTO: UserDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    userDTO.passwordHash = '';
    userDTO.passwordSalt = '';

    this.userService.delete(userDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.userDTOs.forEach((userDTO) => {
      userDTO.passwordHash = '';
      userDTO.passwordSalt = '';
      this.userService.delete(userDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
