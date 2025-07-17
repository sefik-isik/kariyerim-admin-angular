import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonelUserCvSummaryAddComponent } from '../personelUserCvSummaryAdd/personelUserCvSummaryAdd.component';

@Component({
  selector: 'app-personelUserCvSummary',
  templateUrl: './personelUserCvSummary.component.html',
  styleUrls: ['./personelUserCvSummary.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class PersonelUserCvSummaryComponent {
  componentTitle = 'Personel User Cv Summaries';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(PersonelUserCvSummaryAddComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
  }
}
