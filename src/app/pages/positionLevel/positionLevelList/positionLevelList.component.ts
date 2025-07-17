import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Position } from '../../../models/component/position';
import { PositionLevel } from '../../../models/component/positionLevel';
import { FilterPositionLevelPipe } from '../../../pipes/filterPositionLevel.pipe';
import { AuthService } from '../../../services/auth.service';
import { PositionLevelService } from '../../../services/positionLevel.service';
import { PositionLevelDetailComponent } from '../positionLevelDetail/positionLevelDetail.component';
import { PositionLevelUpdateComponent } from '../positionLevelUpdate/positionLevelUpdate.component';

@Component({
  selector: 'app-positionLevelList',
  templateUrl: './positionLevelList.component.html',
  styleUrls: ['./positionLevelList.component.css'],
  imports: [CommonModule, FormsModule, FilterPositionLevelPipe],
})
export class PositionLevelListComponent implements OnInit {
  positionLevels: PositionLevel[] = [];
  admin: boolean = false;
  componentTitle = 'Position Levels';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private positionLevelService: PositionLevelService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getPositionLevels();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getPositionLevels();
      }
    });
  }

  getPositionLevels() {
    this.positionLevelService.getAll().subscribe(
      (response) => {
        this.positionLevels = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(positionLevel: PositionLevel) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.positionLevelService.delete(positionLevel).subscribe(
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
    this.positionLevels.forEach((positionLevel) => {
      this.positionLevelService.delete(positionLevel).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
