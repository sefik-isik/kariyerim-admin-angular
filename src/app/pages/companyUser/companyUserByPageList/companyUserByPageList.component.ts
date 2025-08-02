import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { PageModel } from '../../../models/base/pageModel';
import { CompanyUser } from '../../../models/component/companyUser';
import { CompanyUserDTO } from '../../../models/dto/companyUserDTO';
import { CompanyUserByPageDTO } from '../../../models/pageModel/companyUserByPageDTO';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserService } from '../../../services/companyUser.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserDetailComponent } from '../companyUserDetail/companyUserDetail.component';
import { CompanyUserUpdateComponent } from '../companyUserUpdate/companyUserUpdate.component';

@Component({
  selector: 'app-companyUserByPageList',
  templateUrl: './companyUserByPageList.component.html',
  styleUrls: ['./companyUserByPageList.component.css'],
  imports: [CommonModule, FormsModule, PaginationModule],
})
export class CompanyUserByPageListComponent implements OnInit {
  companyUserDTOs: CompanyUserDTO[] = [];
  companyUserByPageDTO: CompanyUserByPageDTO;
  admin: boolean = false;
  componentTitle = 'Company User By Page List';
  filter1: string;

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 20,
    sortColumn: 'CompanyUserName',
    sortOrder: 'asc',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private companyUserService: CompanyUserService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCompanyUsersByPage();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCompanyUsersByPage();
      }
    });
  }

  getCompanyUsersByPage() {
    this.companyUserService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.companyUserByPageDTO = response.data;
        this.companyUserDTOs = this.companyUserByPageDTO.pageContacts;
        //console.log(this.companyUserByPageDTO.pageContacts);
        this.validationService.handleSuccesses(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  sortByCompanyUserName(sortValue: string) {
    this.pageModel.sortColumn = 'CompanyUserName';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getCompanyUsersByPage();
  }

  sortByEmail(sortValue: string) {
    this.pageModel.sortColumn = 'Email';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getCompanyUsersByPage();
  }

  pageChanged($event: any) {
    this.pageModel.pageIndex = $event.page - 1;
    this.pageModel.pageSize = $event.itemsPerPage;
    this.getCompanyUsersByPage();
  }

  delete(companyUser: CompanyUser) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserService.delete(companyUser).subscribe(
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
    this.companyUserDTOs.forEach((companyUserDTO) => {
      this.companyUserService.delete(companyUserDTO).subscribe(
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

  open(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  openDetail(companyUserDTO: CompanyUserDTO) {
    const modalRef = this.modalService.open(CompanyUserDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserDTO = companyUserDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getCompanyUsersByPage();
  }
}
