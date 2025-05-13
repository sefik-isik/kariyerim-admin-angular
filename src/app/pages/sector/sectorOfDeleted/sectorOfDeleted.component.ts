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
  selector: 'app-sectorOfDeleted',
  templateUrl: './sectorOfDeleted.component.html',
  styleUrls: ['./sectorOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterSectorPipe],
})
export class SectorOfDeletedComponent implements OnInit {
  sectors: Sector[] = [];

  componentTitle = 'Sectors Of Deleted';
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
    this.sectorService.getDeletedAll().subscribe(
      (response) => {
        this.sectors = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(sector: Sector) {
    this.sectorService.update(sector).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.sectors.forEach((sector) => {
      this.sectorService.update(sector).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.getSectors();
  }
}
