import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PositionLevel } from '../../../models/component/positionLevel';

import { PositionLevelService } from '../../../services/positionLevel.service';
import { PositionLevelDetailComponent } from '../positionLevelDetail/positionLevelDetail.component';
import { PositionLevelUpdateComponent } from '../positionLevelUpdate/positionLevelUpdate.component';
import { FilterPositionLevelPipe } from '../../../pipes/filterPositionLevel.pipe';

@Component({
  selector: 'app-positionLevelDeletedList',
  templateUrl: './positionLevelDeletedList.component.html',
  styleUrls: ['./positionLevelDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPositionLevelPipe],
})
export class PositionLevelDeletedListComponent implements OnInit {
  positionLevels: PositionLevel[] = [];

  componentTitle = 'Position Level Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private positionLevelService: PositionLevelService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPositionLevels();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPositionLevels();
      }
    });
  }

  getPositionLevels() {
    this.positionLevelService.getDeletedAll().subscribe(
      (response) => {
        this.positionLevels = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(positionLevel: PositionLevel) {
    this.positionLevelService.update(positionLevel).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.positionLevels.forEach((positionLevel) => {
      this.positionLevelService.update(positionLevel).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(positionLevel: PositionLevel) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.positionLevelService.terminate(positionLevel).subscribe(
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

    this.positionLevels.forEach((positionLevel) => {
      this.positionLevelService.terminate(positionLevel).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(positionLevel: PositionLevel) {
    const modalRef = this.modalService.open(PositionLevelUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.positionLevel = positionLevel;
  }

  openDetail(positionLevel: PositionLevel) {
    const modalRef = this.modalService.open(PositionLevelDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.positionLevel = positionLevel;
  }

  clearInput1() {
    this.filter1 = null;
    this.getPositionLevels();
  }
}
