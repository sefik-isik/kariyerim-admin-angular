import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Count } from '../../../models/component/count';
import { CountService } from '../../../services/count.service';
import { CountDetailComponent } from '../countDetail/countDetail.component';
import { CountUpdateComponent } from '../countUpdate/countUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-countDeletedList',
  templateUrl: './countDeletedList.component.html',
  styleUrls: ['./countDeletedList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CountDeletedListComponent implements OnInit {
  counts: Count[] = [];

  componentTitle = 'Count Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private countService: CountService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.getLicenseDegrees();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getLicenseDegrees();
      }
    });
  }

  getLicenseDegrees() {
    this.countService.getDeletedAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.counts = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(count: Count) {
    this.countService.update(count).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.counts.forEach((count) => {
      this.countService.update(count).subscribe(
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

  terminate(count: Count) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.countService.terminate(count).subscribe(
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

    this.counts.forEach((count) => {
      this.countService.terminate(count).subscribe(
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

  open(count: Count) {
    const modalRef = this.modalService.open(CountUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.count = count;
  }

  openDetail(count: Count) {
    const modalRef = this.modalService.open(CountDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.count = count;
  }

  clearInput1() {
    this.filter1 = null;
    this.getLicenseDegrees();
  }
}
