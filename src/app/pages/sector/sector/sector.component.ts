import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectorAddComponent } from '../sectorAdd/sectorAdd.component';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class SectorComponent {
  componentTitle = 'Sectors';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(SectorAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
