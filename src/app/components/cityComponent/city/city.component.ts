import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CityAddComponent } from '../cityAdd/cityAdd.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CityComponent {
  componentTitle = 'Cities';

  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CityAddComponent, {
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
