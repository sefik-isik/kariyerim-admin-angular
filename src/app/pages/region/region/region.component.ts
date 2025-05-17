import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionAddComponent } from '../regionAdd/regionAdd.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class RegionComponent {
  componentTitle = 'Regions';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(RegionAddComponent, {
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
