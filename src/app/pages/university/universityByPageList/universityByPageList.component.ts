import { University } from './../../../models/component/university';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { PageModel } from '../../../models/base/pageModel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UniversityDTO } from '../../../models/dto/universityDTO';
import { UniversityByPageDTO } from '../../../models/pageModel/universityByPageDTO';
import { UniversityService } from '../../../services/university.service';
import { UniversityUpdateComponent } from '../universityUpdate/universityUpdate.component';
import { UniversityDetailComponent } from '../universityDetail/universityDetail.component';

@Component({
  selector: 'app-universityByPageList',
  templateUrl: './universityByPageList.component.html',
  styleUrls: ['./universityByPageList.component.css'],
  imports: [CommonModule, FormsModule, PaginationModule],
})
export class UniversityByPageListComponent implements OnInit {
  universityDTOs: UniversityDTO[] = [];
  universityByPageDTO: UniversityByPageDTO;
  admin: boolean = false;
  componentTitle = 'University By Page List';
  filter1: string;

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 20,
    sortColumn: 'UniversityName',
    sortOrder: 'asc',
    filter: '',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private universityService: UniversityService,
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
    this.universityService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.universityByPageDTO = response.data;
        this.universityDTOs = this.universityByPageDTO.pageContacts.filter(
          (university) => university.universityName != '-'
        );
        //console.log(this.universityByPageDTO.pageSize);
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

  sort(sortValue: string) {
    this.pageModel.sortColumn = 'UniversityName';
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

  delete(university: University) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityService.delete(university).subscribe(
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
    this.universityDTOs.forEach((universityDTO) => {
      this.universityService.delete(universityDTO).subscribe(
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

  open(universityDTO: UniversityDTO) {
    const modalRef = this.modalService.open(UniversityUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityDTO = universityDTO;
  }

  openDetail(universityDTO: UniversityDTO) {
    const modalRef = this.modalService.open(UniversityDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.universityDTO = universityDTO;
  }

  clearInput1() {
    this.pageModel.filter = '';
    this.filter1 = null;
    this.getDatasByPage();
  }
}
