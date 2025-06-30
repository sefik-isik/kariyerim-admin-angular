import { SectorService } from '../../../services/sectorService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Sector } from '../../../models/component/sector';
import { FilterSectorPipe } from '../../../pipes/filterSector.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectorUpdateComponent } from '../sectorUpdate/sectorUpdate.component';
import { SectorDetailComponent } from '../sectorDetail/sectorDetail.component';

@Component({
  selector: 'app-sectorList',
  templateUrl: './sectorList.component.html',
  styleUrls: ['./sectorList.component.css'],
  imports: [CommonModule, FormsModule, FilterSectorPipe],
})
export class SectorListComponent implements OnInit {
  sectors: Sector[] = [];

  componentTitle = 'Sectors';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private sectorService: SectorService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getSectors();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getSectors();
      }
    });
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (responseError) => console.error
    );
  }

  delete(sector: Sector) {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.sectorService.delete(sector).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => console.error
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin('status')) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.sectors.forEach((sector) => {
      this.sectorService.delete(sector).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(sector: Sector) {
    const modalRef = this.modalService.open(SectorUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.sector = sector;
  }

  openDetail(sector: Sector) {
    const modalRef = this.modalService.open(SectorDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.sector = sector;
  }

  clearInput1() {
    this.filter1 = null;
    this.getSectors();
  }
}
