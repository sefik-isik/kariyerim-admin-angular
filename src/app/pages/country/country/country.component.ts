import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryAddComponent } from '../countryAdd/countryAdd.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CountryComponent {
  componentTitle = 'Countries';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(CountryAddComponent, {
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
