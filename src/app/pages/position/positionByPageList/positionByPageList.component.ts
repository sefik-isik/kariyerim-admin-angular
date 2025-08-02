import { Position } from './../../../models/component/position';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { PositionService } from '../../../services/position.service';
import { PositionDetailComponent } from '../positionDetail/positionDetail.component';
import { PositionUpdateComponent } from '../positionUpdate/positionUpdate.component';
import { ValidationService } from '../../../services/validation.service';
import { PageModel } from '../../../models/base/pageModel';
import { PositionByPageDTO } from '../../../models/pageModel/positionByPageDTO';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-positionByPageList',
  templateUrl: './positionByPageList.component.html',
  styleUrls: ['./positionByPageList.component.css'],
  imports: [CommonModule, FormsModule, PaginationModule],
})
export class PositionByPageListComponent implements OnInit {
  positions: Position[] = [];
  positionByPageDTO: PositionByPageDTO;
  admin: boolean = false;
  componentTitle = 'Position List';
  filter1: string;

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 20,
    sortColumn: 'PositionName',
    sortOrder: 'asc',
    filter: '',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private positionService: PositionService,
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
    this.positionService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.positionByPageDTO = response.data;
        this.positions = this.positionByPageDTO.pageContacts.filter(
          (position) => position.positionName != '-'
        );

        //this.validationService.handleSuccesses(response);
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

  sort(sortValue: string) {
    this.pageModel.sortColumn = 'PositionName';
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

  delete(position: Position) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.positionService.delete(position).subscribe(
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
    this.positions.forEach((position) => {
      this.positionService.delete(position).subscribe(
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

  open(position: Position) {
    const modalRef = this.modalService.open(PositionUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.position = position;
  }

  openDetail(position: Position) {
    const modalRef = this.modalService.open(PositionDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.position = position;
  }

  clearInput1() {
    this.pageModel.filter = '';
    this.filter1 = null;
    this.getDatasByPage();
  }
}
