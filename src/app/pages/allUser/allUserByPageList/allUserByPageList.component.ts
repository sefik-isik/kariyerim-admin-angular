import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { PageModel } from '../../../models/base/pageModel';
import { UserDTO } from '../../../models/dto/userDTO';
import { AllUserByPageDTO } from '../../../models/pageModel/allUserByPageDTO';
import { CodePipe } from '../../../pipes/code.pipe';
import { StatusPipe } from '../../../pipes/status.pipe';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';
import { AllUserDetailComponent } from '../allUserDetail/allUserDetail.component';
import { AllUserUpdateComponent } from '../allUserUpdate/allUserUpdate.component';
import e from 'express';

@Component({
  selector: 'app-allUserByPageList',
  templateUrl: './allUserByPageList.component.html',
  styleUrls: ['./allUserByPageList.component.css'],
  imports: [CommonModule, FormsModule, PaginationModule, CodePipe, StatusPipe],
})
export class AllUserByPageListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  allUserByPageDTO: AllUserByPageDTO;
  admin: boolean = false;
  componentTitle = 'All User By Page List';
  filter1: string = '';

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 5,
    sortColumn: 'FirstName',
    sortOrder: 'asc',
    filter: '',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getDatasByPage();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDatasByPage();
      }
    });
  }

  getDatasByPage() {
    this.userService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.allUserByPageDTO = response.data;
        this.userDTOs = this.allUserByPageDTO.pageContacts;
        //console.log(this.positionByPageDTO.pageSize);
        this.validationService.handleSuccesses(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  filter() {
    if (this.filter1.length > 0) {
      this.pageModel.filter = this.filter1 ? this.filter1 : '';
      this.pageModel.pageIndex = 0; // Reset to first page on filter change
      this.getDatasByPage();
    } else {
      this.pageModel.filter = '';
      this.getDatasByPage();
    }
  }

  sortByFirstName(sortValue: string) {
    this.pageModel.sortColumn = 'FirstName';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getDatasByPage();
  }

  sortByLastName(sortValue: string) {
    this.pageModel.sortColumn = 'LastName';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getDatasByPage();
  }

  sortByEmail(sortValue: string) {
    this.pageModel.sortColumn = 'Email';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getDatasByPage();
  }

  pageChanged($event: any) {
    this.pageModel.pageIndex = $event.page - 1;
    this.pageModel.pageSize = $event.itemsPerPage;
    this.getDatasByPage();
  }

  delete(userDTO: UserDTO) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.userService.delete(userDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.userDTOs.forEach((allUser) => {
      this.userService.delete(allUser).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
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
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.userDTO = userDTO;
  }

  openDetail(userDTO: UserDTO) {
    const modalRef = this.modalService.open(AllUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.userDTO = userDTO;
  }

  clearInput1() {
    this.pageModel.filter = '';
    this.filter1 = null;
    this.getDatasByPage();
  }
}
