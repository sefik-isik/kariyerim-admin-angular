import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaxOfficeAddComponent } from '../taxOfficeAdd/taxOfficeAdd.component';

@Component({
  selector: 'app-taxOffice',
  templateUrl: './taxOffice.component.html',
  styleUrls: ['./taxOffice.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class TaxOfficeComponent {
  componentTitle = 'Tax Offices';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(TaxOfficeAddComponent, {
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
