import { AllUserDetailComponent } from './../allUserDetail/allUserDetail.component';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterAllUserPipe } from '../../../pipes/filterAllUser.pipe';
import { CodePipe } from '../../../pipes/code.pipe';
import { StatusPipe } from '../../../pipes/status.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllUserUpdateComponent } from '../allUserUpdate/allUserUpdate.component';

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
  userId: number;
  status: string;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUsers();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUsers();
      }
    });
    this.status = this.localStorageService.getFromLocalStorage('status');
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(userDTO: UserDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    userDTO.passwordHash = 'passwordHash';
    userDTO.passwordSalt = 'passwordSalt';

    this.authService.deleteUser(userDTO).subscribe(
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
