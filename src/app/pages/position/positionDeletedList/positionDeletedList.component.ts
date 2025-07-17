import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../../../models/component/position';
import { PositionService } from '../../../services/position.service';
import { PositionDetailComponent } from '../positionDetail/positionDetail.component';
import { PositionUpdateComponent } from '../positionUpdate/positionUpdate.component';
import { FilterPositionPipe } from '../../../pipes/filterPosition.pipe';

@Component({
  selector: 'app-positionDeletedList',
  templateUrl: './positionDeletedList.component.html',
  styleUrls: ['./positionDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterPositionPipe],
})
export class PositionDeletedListComponent implements OnInit {
  positions: Position[] = [];

  componentTitle = 'Position Deleted List';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private positionService: PositionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPositions();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPositions();
      }
    });
  }

  getPositions() {
    this.positionService.getDeletedAll().subscribe(
      (response) => {
        this.positions = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(position: Position) {
    this.positionService.update(position).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.positions.forEach((position) => {
      this.positionService.update(position).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(position: Position) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.positionService.terminate(position).subscribe(
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

    this.positions.forEach((position) => {
      this.positionService.terminate(position).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(position: Position) {
    const modalRef = this.modalService.open(PositionUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.position = position;
  }

  openDetail(position: Position) {
    const modalRef = this.modalService.open(PositionDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.position = position;
  }

  clearInput1() {
    this.filter1 = null;
    this.getPositions();
  }
}
