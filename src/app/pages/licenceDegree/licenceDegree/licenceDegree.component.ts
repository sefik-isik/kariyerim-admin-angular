import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceDegreeAddComponent } from '../licenceDegreeAdd/licenceDegreeAdd.component';

@Component({
  selector: 'app-licenceDegree',
  templateUrl: './licenceDegree.component.html',
  styleUrls: ['./licenceDegree.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class LicenceDegreeComponent {
  componentTitle = 'Licence Degrees';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(LicenceDegreeAddComponent, {
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
