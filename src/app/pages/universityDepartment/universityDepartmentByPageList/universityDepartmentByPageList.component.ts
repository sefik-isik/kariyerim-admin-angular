import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { PageModel } from '../../../models/base/pageModel';
import { UniversityDepartmentByPageDTO } from '../../../models/pageModel/universityDepartmentByPageDTO';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { UniversityDepartment } from '../../../models/component/universitydepartment';
import { UniversityDepartmentUpdateComponent } from '../universityDepartmentUpdate/universityDepartmentUpdate.component';
import { UniversityDepartmentDetailComponent } from '../universityDepartmentDetail/universityDepartmentDetail.component';

@Component({
  selector: 'app-universityDepartmentByPageList',
  templateUrl: './universityDepartmentByPageList.component.html',
  styleUrls: ['./universityDepartmentByPageList.component.css'],
  imports: [CommonModule, FormsModule, PaginationModule],
})
export class UniversityDepartmentByPageListComponent implements OnInit {
  universityDepartments: UniversityDepartment[] = [];
  universityDepartmentByPageDTO: UniversityDepartmentByPageDTO;
  admin: boolean = false;
  componentTitle = 'UniversityDepartment List';
  filter1: string;

  pageModel: PageModel = {
    pageIndex: 0,
    pageSize: 20,
    sortColumn: 'DepartmentName',
    sortOrder: 'asc',
    filter: '',
  };

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private universityDepartmentService: UniversityDepartmentService,
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
    this.universityDepartmentService.getAllByPage(this.pageModel).subscribe(
      (response) => {
        this.universityDepartmentByPageDTO = response.data;
        this.universityDepartments =
          this.universityDepartmentByPageDTO.pageContacts.filter(
            (universityDepartment) => universityDepartment.departmentName != '-'
          );
        //console.log(this.universityDepartmentByPageDTO.pageSize);
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
    this.pageModel.sortColumn = 'DepartmentName';
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

  delete(universityDepartment: UniversityDepartment) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.universityDepartmentService.delete(universityDepartment).subscribe(
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
    this.universityDepartments.forEach((universityDepartment) => {
      this.universityDepartmentService.delete(universityDepartment).subscribe(
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

  open(universityDepartment: UniversityDepartment) {
    const modalRef = this.modalService.open(
      UniversityDepartmentUpdateComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.universityDepartment = universityDepartment;
  }

  openDetail(universityDepartment: UniversityDepartment) {
    const modalRef = this.modalService.open(
      UniversityDepartmentDetailComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.universityDepartment = universityDepartment;
  }

  clearInput1() {
    this.pageModel.filter = '';
    this.filter1 = null;
    this.getDatasByPage();
  }
}
