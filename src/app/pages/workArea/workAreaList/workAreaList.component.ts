import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { WorkArea } from '../../../models/component/workArea';
import { FilterWorkAreaPipe } from '../../../pipes/filterWorkArea.pipe';
import { WorkAreaService } from '../../../services/workArea.service';
import { WorkAreaDetailComponent } from '../workAreaDetail/workAreaDetail.component';
import { WorkAreaUpdateComponent } from '../workAreaUpdate/workAreaUpdate.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-workAreaList',
  templateUrl: './workAreaList.component.html',
  styleUrls: ['./workAreaList.component.css'],
  imports: [CommonModule, FormsModule, FilterWorkAreaPipe],
})
export class WorkAreaListComponent implements OnInit {
  workAreas: WorkArea[] = [];
  admin: boolean = false;
  componentTitle = 'WorkAreas';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private workAreaService: WorkAreaService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getWorkAreas();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getWorkAreas();
      }
    });
  }

  getWorkAreas() {
    this.workAreaService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.workAreas = response.data.filter((f) => f.areaName != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(workArea: WorkArea) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.workAreaService.delete(workArea).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.workAreas.forEach((workArea) => {
      this.workAreaService.delete(workArea).subscribe(
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

  open(workArea: WorkArea) {
    const modalRef = this.modalService.open(WorkAreaUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.workArea = workArea;
  }

  openDetail(workArea: WorkArea) {
    const modalRef = this.modalService.open(WorkAreaDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.workArea = workArea;
  }

  clearInput1() {
    this.filter1 = null;
    this.getWorkAreas();
  }
}
