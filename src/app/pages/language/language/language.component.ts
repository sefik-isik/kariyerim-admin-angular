import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageAddComponent } from '../languageAdd/languageAdd.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
  imports: [RouterOutlet, RouterLink, CommonModule],
})
export class LanguageComponent {
  componentTitle = 'Languages';
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(LanguageAddComponent, {
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
