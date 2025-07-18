import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Count } from '../../../models/component/count';
import { AuthService } from '../../../services/auth.service';
import { CountService } from '../../../services/count.service';
import { CountDetailComponent } from '../countDetail/countDetail.component';
import { CountUpdateComponent } from '../countUpdate/countUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-countList',
  templateUrl: './countList.component.html',
  styleUrls: ['./countList.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CountListComponent implements OnInit {
  counts: Count[] = [];
  componentTitle = 'Count List';
  admin: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private countService: CountService,
    private modalService: NgbModal,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();

    this.getCounts();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCounts();
      }
    });
  }

  getCounts() {
    this.countService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.counts = response.data.filter((f) => f.countValue != '-');
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(count: Count) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.countService.delete(count).subscribe(
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
    this.counts.forEach((count) => {
      this.countService.delete(count).subscribe(
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
}
