import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UniversityDepartment } from '../../../models/component/universitydepartment';

import { UniversityDepartmentService } from '../../../services/universityDepartment.service';
import { ValidationService } from '../../../services/validation.service';
import { UniversityDepartmentDetailComponent } from '../universityDepartmentDetail/universityDepartmentDetail.component';
import { UniversityDepartmentUpdateComponent } from '../universityDepartmentUpdate/universityDepartmentUpdate.component';
import { FilterUniversityDepartmentPipe } from '../../../pipes/filterUniversityDepartment.pipe';

@Component({
  selector: 'app-universityDepartmentDeletedList',
  templateUrl: './universityDepartmentDeletedList.component.html',
  styleUrls: ['./universityDepartmentDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterUniversityDepartmentPipe],
})
export class UniversityDepartmentDeletedListComponent implements OnInit {
  universityDepartments: UniversityDepartment[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'University Department Deleted List';
  constructor(
    private universityDepartmentService: UniversityDepartmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getUniversityDepartments();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getUniversityDepartments();
      }
    });
  }

  getUniversityDepartments() {
    this.universityDepartmentService.getDeletedAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.universityDepartments = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(universityDepartment: UniversityDepartment) {
    this.universityDepartmentService.update(universityDepartment).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.universityDepartments.forEach((universityDepartment) => {
      this.universityDepartmentService.update(universityDepartment).subscribe(
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

  terminate(universityDepartment: UniversityDepartment) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.universityDepartmentService.terminate(universityDepartment).subscribe(
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

    this.universityDepartments.forEach((universityDepartment) => {
      this.universityDepartmentService
        .terminate(universityDepartment)
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
    this.filter1 = null;
    this.getUniversityDepartments();
  }
}
