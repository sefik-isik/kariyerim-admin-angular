import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseDegreeAddComponent } from '../licenseDegreeAdd/licenseDegreeAdd.component';

@Component({
  selector: 'app-licenseDegree',
  templateUrl: './licenseDegree.component.html',
  styleUrls: ['./licenseDegree.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class LicenseDegreeComponent {
  componentTitle = 'License Degrees';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(LicenseDegreeAddComponent, {
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
