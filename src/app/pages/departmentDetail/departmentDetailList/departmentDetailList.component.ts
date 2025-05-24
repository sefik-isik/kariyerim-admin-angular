import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDetailUpdateComponent } from '../departmentDetailUpdate/departmentDetailUpdate.component';
import { DepartmentDetail } from '../../../models/departmentDetail';
import { DepartmentDetailService } from '../../../services/departmentDetail.service';
import { DepartmentDetailDetailComponent } from '../departmentDetailDetail/departmentDetailDetail.component';
import { FilterDepartmentDetailPipe } from '../../../pipes/filterDepartmentDetail.pipe';
import { AuthService } from '../../../services/auth.service';
import { DepartmentDetailDTO } from '../../../models/departmentDetailDTO';

@Component({
  selector: 'app-departmentDetailList',
  templateUrl: './departmentDetailList.component.html',
  styleUrls: ['./departmentDetailList.component.css'],
  imports: [CommonModule, FormsModule, FilterDepartmentDetailPipe],
})
export class DepartmentDetailListComponent implements OnInit {
  departmentDetailDTOs: DepartmentDetailDTO[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Deleted Department Details';
  constructor(
    private departmentDetailService: DepartmentDetailService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getDepartmentDetails();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDepartmentDetails();
      }
    });
  }

  getDepartmentDetails() {
    this.departmentDetailService.getAllDTO().subscribe(
      (response) => {
        this.departmentDetailDTOs = response.data;
      },
      (error) => console.error
    );
  }

  delete(departmentDetail: DepartmentDetail) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.departmentDetailService.delete(departmentDetail).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (error) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.departmentDetailDTOs.forEach((departmentDetailDTO) => {
      this.departmentDetailService.delete(departmentDetailDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(departmentDetailDTO: DepartmentDetailDTO) {
    const modalRef = this.modalService.open(DepartmentDetailUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.departmentDetailDTO = departmentDetailDTO;
  }

  openDetail(departmentDetailDTO: DepartmentDetailDTO) {
    const modalRef = this.modalService.open(DepartmentDetailDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.departmentDetailDTO = departmentDetailDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getDepartmentDetails();
  }
}
