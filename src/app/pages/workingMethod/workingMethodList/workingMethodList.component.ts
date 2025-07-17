import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { WorkingMethod } from '../../../models/component/workingMethod';
import { WorkingMethodService } from '../../../services/workingMethod.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkingMethodUpdateComponent } from '../workingMethodUpdate/workingMethodUpdate.component';
import { WorkingMethodDetailComponent } from '../workingMethodDetail/workingMethodDetail.component';

@Component({
  selector: 'app-workingMethodList',
  templateUrl: './workingMethodList.component.html',
  styleUrls: ['./workingMethodList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class WorkingMethodListComponent implements OnInit {
  workingMethods: WorkingMethod[] = [];
  admin: boolean = false;
  componentTitle = 'Working Methods';

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private workingMethodService: WorkingMethodService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getWorkingMethods();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getWorkingMethods();
      }
    });
  }

  getWorkingMethods() {
    this.workingMethodService.getAll().subscribe(
      (response) => {
        this.workingMethods = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(workingMethod: WorkingMethod) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.workingMethodService.delete(workingMethod).subscribe(
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
    this.workingMethods.forEach((workingMethod) => {
      this.workingMethodService.delete(workingMethod).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
}
