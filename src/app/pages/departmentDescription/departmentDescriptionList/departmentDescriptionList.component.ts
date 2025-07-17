import { DepartmentDescriptionUpdateComponent } from './../../departmentDescription/departmentDescriptionUpdate/departmentDescriptionUpdate.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDescription } from '../../../models/component/departmentDescription';
import { DepartmentDescriptionService } from '../../../services/departmentDescription.service';
import { DepartmentDescriptionDetailComponent } from '../../departmentDescription/departmentDescriptionDetail/departmentDescriptionDetail.component';
import { FilterDepartmentDescriptionPipe } from '../../../pipes/filterDepartmentDescription.pipe';
import { AuthService } from '../../../services/auth.service';
import { DepartmentDescriptionDTO } from '../../../models/dto/departmentDescriptionDTO';

@Component({
  selector: 'app-departmentDescriptionList',
  templateUrl: './departmentDescriptionList.component.html',
  styleUrls: ['./departmentDescriptionList.component.css'],
  imports: [CommonModule, FormsModule, FilterDepartmentDescriptionPipe],
})
export class DepartmentDescriptionListComponent implements OnInit {
  departmentDescriptionDTOs: DepartmentDescriptionDTO[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Deleted Department Details';
  admin: boolean = false;

  constructor(
    private departmentDescriptionService: DepartmentDescriptionService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getDepartmentDescriptions();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDepartmentDescriptions();
      }
    });
  }

  getDepartmentDescriptions() {
    this.departmentDescriptionService.getAllDTO().subscribe(
      (response) => {
        this.departmentDescriptionDTOs = response.data.filter(
          (f) => f.departmentName != '-'
        );
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(departmentDescription: DepartmentDescription) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.departmentDescriptionService.delete(departmentDescription).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
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
    this.departmentDescriptionDTOs.forEach((departmentDescriptionDTO) => {
      this.departmentDescriptionService
        .delete(departmentDescriptionDTO)
        .subscribe(
          (response) => {},
          (responseError) =>
            this.toastrService.error(responseError.error.message)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(departmentDescriptionDTO: DepartmentDescriptionDTO) {
    const modalRef = this.modalService.open(
      DepartmentDescriptionUpdateComponent,
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
    modalRef.componentInstance.departmentDescriptionDTO =
      departmentDescriptionDTO;
  }

  openDetail(departmentDescriptionDTO: DepartmentDescriptionDTO) {
    const modalRef = this.modalService.open(
      DepartmentDescriptionDetailComponent,
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
    modalRef.componentInstance.departmentDescriptionDTO =
      departmentDescriptionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getDepartmentDescriptions();
  }
}
