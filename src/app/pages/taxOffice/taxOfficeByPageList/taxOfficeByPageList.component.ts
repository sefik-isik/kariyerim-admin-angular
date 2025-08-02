import { TaxOffice } from './../../../models/component/taxOffice';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { PageModel } from '../../../models/base/pageModel';
import { TaxOfficeByPageDTO } from '../../../models/pageModel/taxOfficeByPageDTO';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TaxOfficeService } from '../../../services/taxOffice.service';
import { TaxOfficeUpdateComponent } from '../taxOfficeUpdate/taxOfficeUpdate.component';
import { TaxOfficeDetailComponent } from '../taxOfficeDetail/taxOfficeDetail.component';

@Component({
  selector: 'app-taxOfficeByPageList',
  templateUrl: './taxOfficeByPageList.component.html',
  styleUrls: ['./taxOfficeByPageList.component.css'],
  imports: [CommonModule, FormsModule, PaginationModule],
})
export class TaxOfficeByPageListComponent implements OnInit {
  taxOffices: TaxOffice[] = [];
  taxOfficeByPageDTO: TaxOfficeByPageDTO;
  admin: boolean = false;
  componentTitle = 'Tax Office By Page List';
  filter1: string;

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 20,
    sortColumn: 'TaxOfficeName',
    sortOrder: 'asc',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private taxOfficeService: TaxOfficeService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getTaxOfficesByPage();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getTaxOfficesByPage();
      }
    });
  }

  getTaxOfficesByPage() {
    this.taxOfficeService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.taxOfficeByPageDTO = response.data;
        this.taxOffices = this.taxOfficeByPageDTO.pageContacts.filter(
          (taxOffice) => taxOffice.taxOfficeName != '-'
        );
        //console.log(this.taxOfficeByPageDTO.pageSize);
        this.validationService.handleSuccesses(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  sort(sortValue: string) {
    this.pageModel.sortColumn = 'TaxOfficeName';
    if (sortValue === 'desc') {
      this.pageModel.sortOrder = 'desc';
    } else {
      this.pageModel.sortOrder = 'asc';
    }
    this.getTaxOfficesByPage();
  }

  pageChanged($event: any) {
    this.pageModel.pageIndex = $event.page - 1;
    this.pageModel.pageSize = $event.itemsPerPage;
    this.getTaxOfficesByPage();
  }

  delete(taxOffice: TaxOffice) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.taxOfficeService.delete(taxOffice).subscribe(
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
    this.taxOffices.forEach((taxOffice) => {
      this.taxOfficeService.delete(taxOffice).subscribe(
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

  open(taxOffice: TaxOffice) {
    const modalRef = this.modalService.open(TaxOfficeUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.taxOffice = taxOffice;
  }

  openDetail(taxOffice: TaxOffice) {
    const modalRef = this.modalService.open(TaxOfficeDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.taxOffice = taxOffice;
  }

  clearInput1() {
    this.filter1 = null;
    this.getTaxOfficesByPage();
  }
}
