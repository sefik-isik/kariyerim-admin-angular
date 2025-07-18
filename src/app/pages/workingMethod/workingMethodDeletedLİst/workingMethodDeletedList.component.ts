import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkingMethodUpdateComponent } from '../workingMethodUpdate/workingMethodUpdate.component';
import { WorkingMethodDetailComponent } from '../workingMethodDetail/workingMethodDetail.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-workingMethodDeletedList',
  templateUrl: './workingMethodDeletedList.component.html',
  styleUrls: ['./workingMethodDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class WorkingMethodDeletedListComponent implements OnInit {
  workingMethods: WorkingMethod[] = [];

  componentTitle = 'Working Methods Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private workingMethodService: WorkingMethodService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getWorkingMethods();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getWorkingMethods();
      }
    });
  }

  getWorkingMethods() {
    this.workingMethodService.getDeletedAll().subscribe(
      (response) => {
        this.workingMethods = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(workingMethod: WorkingMethod) {
    this.workingMethodService.update(workingMethod).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.workingMethods.forEach((workingMethod) => {
      this.workingMethodService.update(workingMethod).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(workingMethod: WorkingMethod) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.workingMethodService.terminate(workingMethod).subscribe(
      (response) => {
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

    this.workingMethods.forEach((workingMethod) => {
      this.workingMethodService.terminate(workingMethod).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(workingMethod: WorkingMethod) {
    const modalRef = this.modalService.open(WorkingMethodUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.workingMethod = workingMethod;
  }

  openDetail(workingMethod: WorkingMethod) {
    const modalRef = this.modalService.open(WorkingMethodDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.workingMethod = workingMethod;
  }

  clearInput1() {
    this.filter1 = null;
    this.getWorkingMethods();
  }
}
