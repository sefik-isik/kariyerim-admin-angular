import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDescriptionUpdateComponent } from '../departmentDescriptionUpdate/departmentDescriptionUpdate.component';
import { DepartmentDescription } from '../../../models/component/departmentDescription';
import { DepartmentDescriptionService } from '../../../services/departmentDescription.service';
import { DepartmentDescriptionDetailComponent } from '../departmentDescriptionDetail/departmentDescriptionDetail.component';
import { FilterDepartmentDescriptionPipe } from '../../../pipes/filterDepartmentDescription.pipe';
import { DepartmentDescriptionDTO } from '../../../models/dto/departmentDescriptionDTO';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-departmentDescriptionDeletedList',
  templateUrl: './departmentDescriptionDeletedList.component.html',
  styleUrls: ['./departmentDescriptionDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterDepartmentDescriptionPipe],
})
export class DepartmentDescriptionDeletedListComponent implements OnInit {
  departmentDescriptionDTOs: DepartmentDescriptionDTO[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Deleted Department Details';
  constructor(
    private departmentDescriptionService: DepartmentDescriptionService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private validationService: ValidationService
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
    this.departmentDescriptionService.getDeletedAllDTO().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.departmentDescriptionDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(departmentDetail: DepartmentDescription) {
    this.departmentDescriptionService.update(departmentDetail).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.departmentDescriptionDTOs.forEach((departmentDescriptionDTO) => {
      this.departmentDescriptionService
        .update(departmentDescriptionDTO)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(departmentDescription: DepartmentDescriptionDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.departmentDescriptionService
      .terminate(departmentDescription)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success('Başarı ile kalıcı olarak silindi');
          this.ngOnInit();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.departmentDescriptionDTOs.forEach((departmentDescription) => {
      this.departmentDescriptionService
        .terminate(departmentDescription)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
    this.getDepartmentDetails();
  }
}
