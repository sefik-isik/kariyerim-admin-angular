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
  selector: 'app-sectorDeletedList',
  templateUrl: './sectorDeletedList.component.html',
  styleUrls: ['./sectorDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterSectorPipe],
})
export class SectorDeletedListComponent implements OnInit {
  sectors: Sector[] = [];

  componentTitle = 'Sectors Deleted List';
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
    this.sectorService.getDeletedAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(sector: Sector) {
    this.sectorService.update(sector).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => console.error
    );
  }

  unDeleteAll() {
    this.sectors.forEach((sector) => {
      this.sectorService.update(sector).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(sector: Sector) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.sectorService.terminate(sector).subscribe(
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

    this.sectors.forEach((sector) => {
      this.sectorService.terminate(sector).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
