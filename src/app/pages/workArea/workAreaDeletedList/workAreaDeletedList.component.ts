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

@Component({
  selector: 'app-workAreaDeletedList',
  templateUrl: './workAreaDeletedList.component.html',
  styleUrls: ['./workAreaDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterWorkAreaPipe],
})
export class WorkAreaDeletedListComponent implements OnInit {
  workAreas: WorkArea[] = [];
  filter1: string;
  componentTitle = 'WorkArea Deleted List';

  constructor(
    private toastrService: ToastrService,
    private workAreaService: WorkAreaService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getWorkAreas();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getWorkAreas();
      }
    });
  }

  getWorkAreas() {
    this.workAreaService.getDeletedAll().subscribe(
      (response) => {
        this.workAreas = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(workArea: WorkArea) {
    this.workAreaService.update(workArea).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.workAreas.forEach((workArea) => {
      this.workAreaService.update(workArea).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(workArea: WorkArea) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.workAreaService.terminate(workArea).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.workAreas.forEach((workArea) => {
      this.workAreaService.terminate(workArea).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
