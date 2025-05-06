import { SectorService } from './../../../services/sectorService';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Sector } from '../../../models/sector';
import { FilterSectorPipe } from '../../../pipes/filterSector.pipe';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterSectorPipe],
})
export class SectorComponent implements OnInit {
  sectors: Sector[] = [];
  componentTitle = 'Sectors';
  filter1: string;

  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private sectorService: SectorService
  ) {}

  ngOnInit() {
    this.getSectors();
  }

  getSectors() {
    this.sectorService.getAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (error) => console.error
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
      (error) => console.error
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
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getSectors();
  }
}
