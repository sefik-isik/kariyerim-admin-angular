import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAdvertJobDescriptionAddComponent } from '../companyUserAdvertJobDescriptionAdd/companyUserAdvertJobDescriptionAdd.component';

@Component({
  selector: 'app-companyUserAdvertJobDescription',
  templateUrl: './companyUserAdvertJobDescription.component.html',
  styleUrls: ['./companyUserAdvertJobDescription.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class CompanyUserAdvertJobDescriptionComponent {
  componentTitle = 'Company User Advert Job Description';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(
      CompanyUserAdvertJobDescriptionAddComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
  }
}
