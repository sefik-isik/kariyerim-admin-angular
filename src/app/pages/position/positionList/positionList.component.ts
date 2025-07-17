import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../../../models/component/position';
import { FilterPositionPipe } from '../../../pipes/filterPosition.pipe';
import { AuthService } from '../../../services/auth.service';
import { PositionService } from '../../../services/position.service';
import { PositionDetailComponent } from '../positionDetail/positionDetail.component';
import { PositionUpdateComponent } from '../positionUpdate/positionUpdate.component';

@Component({
  selector: 'app-positionList',
  templateUrl: './positionList.component.html',
  styleUrls: ['./positionList.component.css'],
  imports: [CommonModule, FormsModule, FilterPositionPipe],
})
export class PositionListComponent implements OnInit {
  positions: Position[] = [];
  admin: boolean = false;
  componentTitle = 'Sectors';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private positionService: PositionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getPositions();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPositions();
      }
    });
  }

  getPositions() {
    this.positionService.getAll().subscribe(
      (response) => {
        this.positions = response.data;
      },
      (responseError) => console.log(responseError)
    );
  }

  delete(position: Position) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.positionService.delete(position).subscribe(
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
    this.positions.forEach((position) => {
      this.positionService.delete(position).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
